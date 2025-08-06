// lib/strapi.js

/* ──────────────────────────────────────────────
   Universal Strapi helper — no external deps
   ────────────────────────────────────────────── */

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') ||
  'http://localhost:1337';

const API_PREFIX =
  (process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api').replace(/\/?$/, '');

const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

function toQuery(params = {}) {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => q.append(key, v));
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) =>
        q.append(`${key}[${k}]`, v)
      );
    } else {
      q.append(key, value);
    }
  });

  return q.toString();
}

function buildURL(path = '', params = {}) {
  const query = toQuery(params);
  const clean = path.startsWith('/') ? path : `/${path}`;
  const url =
    API_PREFIX && clean.startsWith(API_PREFIX)
      ? `${API_URL}${clean}`
      : `${API_URL}${API_PREFIX}${clean}`;
  return query ? `${url}?${query}` : url;
}

/**
 * Low‐level fetch helper for any Strapi endpoint
 */
export async function fetchStrapi(path, options = {}) {
  const {
    params = {},
    method = 'GET',
    headers = {},
    next = { revalidate: 60 * 60 * 4 },
    ...rest
  } = options;

  const url = buildURL(path, params);
  if (process.env.NODE_ENV === 'development') console.log('[Strapi] →', url);

  const res = await fetch(url, {
    method,
    headers: {
      ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
      'Content-Type': 'application/json',
      ...headers,
    },
    next,
    ...rest,
  });

  if (res.status === 404) {
    if (process.env.NODE_ENV === 'development')
      console.warn('[Strapi] 404 – returning empty data for', url);
    return { data: null };
  }

  if (!res.ok) {
    console.error(`Strapi fetch failed [${res.status}]: ${res.statusText}`);
    throw new Error('Failed to fetch Strapi data');
  }

  return res.json();
}

/**
 * Turn any Strapi media field into an absolute URL (v4 or v5)
 */
export function getMediaURL(mediaLike) {
  const maybeData = mediaLike?.data ?? mediaLike;
  const url =
    maybeData?.attributes?.url ?? // v4
    maybeData?.url;                // v5

  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

/* ──────────────────────────────────────────────
   Example higher-level helpers
   ────────────────────────────────────────────── */

export async function getHeroSettings() {
  const res = await fetchStrapi('/hero-setting', {
    params: { populate: '*' },
  });
  const entry = res.data?.attributes ?? res.data ?? {};

  return {
    leftImage: getMediaURL(entry.HeroImageLeft),
    rightImage: getMediaURL(entry.HeroImageRight),
  };
}

export async function getBadgeItems() {
  const res = await fetchStrapi('/badges', {
    params: { populate: 'Icon', sort: 'Order:asc' },
  });
  return (res.data || []).map((item) => {
    const attrs = item.attributes ?? item;
    return {
      src: getMediaURL(attrs.Icon),
      title: attrs.Title,
      caption: attrs.Caption,
    };
  });
}

/**
 * Fetch all "Info Section" entries (populating the Image field
 * and sorting by Order), and map them into plain objects for
 * your InfoSection component.
 */
export async function getInfoSections() {
  const res = await fetchStrapi('/info-sections', {
    params: {
      populate:   'Image',
      sort:       'Order:asc',         
      pagination: { pageSize: 100 },  
    },
  });

  return (res.data || []).map((item) => {
    const attrs = item.attributes ?? item;
    return {
      title:    attrs.Title  ?? attrs.title,
      body:     attrs.Body   ?? attrs.body,
      imageSrc: getMediaURL(attrs.Image),
      order:    attrs.Order  ?? attrs.order,
    };
  });
}
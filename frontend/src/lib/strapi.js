/* ──────────────────────────────────────────────
   Universal Strapi helper — no external deps
   ────────────────────────────────────────────── */

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') ||
  'http://localhost:1337';

const API_PREFIX =
  // ''  -> Strapi v3
  // '/api' (default) -> Strapi v4/5
  (process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api').replace(/\/?$/, '');

const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

/* Convert params → Strapi query string */
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
  const clean  = path.startsWith('/') ? path : `/${path}`;
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
    next   = { revalidate: 60 * 60 * 4 }, // 4h ISR
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

  // If your single‐type hasn't been created yet, return empty data
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
    // v4
    maybeData?.attributes?.url ??
    // v5
    maybeData?.url;

  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

/* ──────────────────────────────────────────────
   High-level helpers for your single‐types
   ────────────────────────────────────────────── */

/**
 * Fetch your “Hero Settings” single type,
 * pull in both HeroImageLeft + HeroImageRight,
 * and return { leftImage, rightImage } as absolute URLs.
 */
export async function getHeroSettings() {
  const res = await fetchStrapi('/hero-setting', {
    params: {
      // either populate all, or explicitly these two fields
      populate: '*' 
      // or
      // populate: { HeroImageLeft: '*', HeroImageRight: '*' }
    },
  });

  // Strapi v5 single‐type: fields are on res.data
  // Strapi v4: they'd be on res.data.attributes
  const entry = res.data?.attributes ?? res.data ?? {};

  return {
    leftImage: getMediaURL(entry.HeroImageLeft),
    rightImage: getMediaURL(entry.HeroImageRight),
  };
}
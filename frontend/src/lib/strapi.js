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

/* Build query string the Strapi way (arrays + shallow objects) */
function toQuery(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, v));
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) =>
        search.append(`${key}[${k}]`, v)
      );
    } else {
      search.append(key, value);
    }
  });

  return search.toString();
}

function buildURL(path = '', params = {}) {
  const query = toQuery(params);

  // Ensure single leading slash, but DO NOT double-prefix
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url =
    API_PREFIX && cleanPath.startsWith(API_PREFIX)
      ? `${API_URL}${cleanPath}`
      : `${API_URL}${API_PREFIX}${cleanPath}`;

  return query ? `${url}?${query}` : url;
}

/* ---------------------------------------------------------- */
export async function fetchStrapi(path, opts = {}) {
  const {
    params = {},
    method = 'GET',
    headers = {},
    next = { revalidate: 60 * 60 * 4 }, // 4 hours ISR
    ...rest
  } = opts;

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

  if (!res.ok) {
    console.error(`Strapi fetch failed [${res.status}]: ${res.statusText}`);
    throw new Error('Failed to fetch Strapi data');
  }

  return res.json();
}

/* Turn a Strapi media object ➜ absolute URL */
export function getMediaURL(media) {
  if (!media?.data?.attributes?.url) return null;
  const url = media.data.attributes.url;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

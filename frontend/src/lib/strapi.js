const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const TOKEN   = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function fetchStrapi(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.statusText}`);
  }
  return res.json();
}

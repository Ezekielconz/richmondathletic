// components/BadgeInfo.jsx  (server component, no "use client")
import Image from 'next/image'
import styles from '../styles/badgeInfo.module.css'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') ||
  'http://localhost:1337'
const API_PREFIX =
  (process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api').replace(/\/?$/, '')

export default async function BadgeInfo() {
  /* 1 ▸ fetch */
  const res = await fetch(
    `${API_URL}${API_PREFIX}/badges?populate=Icon&sort=Order:asc`,
    { next: { revalidate: 60 * 60 * 4 } }
  )
  if (!res.ok) throw new Error('Failed to fetch badges')
  const { data } = await res.json()

  /* 2 ▸ normalise */
  const badgeItems = (data || []).map((entry) => {
    // Strapi v4 → entry.attributes
    // Strapi v5 → fields are on the entry itself
    const attrs = entry.attributes ?? entry ?? {}

    const icon = attrs.Icon ?? attrs.icon
    const urlPath =
      icon?.data?.attributes?.url ||                    // v4
      icon?.data?.url ||                                // v5 (REST)
      icon?.url || ''                                   // already flattened
    const src = urlPath.startsWith('http')
      ? urlPath
      : urlPath ? `${API_URL}${urlPath}` : ''

    return {
      src,
      title: attrs.Title ?? attrs.title ?? '',
      caption: attrs.Caption ?? attrs.caption ?? '',
    }
  })

  if (badgeItems.length === 0) return null

  /* 3 ▸ render */
  return (
    <section className={styles.badgeSection}>
      <div className={styles.container}>
        {badgeItems.map((item, i) => (
          <div key={i} className={styles.badgeItem}>
            {item.src && (
              <Image
                src={item.src}
                alt={item.title}
                width={60}
                height={60}
                className={styles.icon}
              />
            )}
            <h3 className={styles.title}>{item.title}</h3>
            {item.caption && <p className={styles.caption}>{item.caption}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

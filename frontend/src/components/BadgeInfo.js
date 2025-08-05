// components/BadgeInfo.jsx
import Image from 'next/image'
import styles from '../styles/badgeInfo.module.css'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') ||
  'http://localhost:1337'
const API_PREFIX =
  (process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api').replace(/\/?$/, '')

export default async function BadgeInfo() {
  // 1. Fetch directly from Strapi:
  const res = await fetch(
    `${API_URL}${API_PREFIX}/badges?populate=Icon&sort=Order:asc`,
    { next: { revalidate: 60 * 60 * 4 } } // 4h ISR
  )
  if (!res.ok) throw new Error('Failed to fetch badges')
  const { data } = await res.json()

  // 2. Massage into the shape your UI needs:
  const badgeItems = (data || []).map((entry) => {
    const attrs = entry.attributes
    const urlPath = attrs.Icon?.data?.attributes.url
    const src = urlPath?.startsWith('http')
      ? urlPath
      : `${API_URL}${urlPath}`

    return {
      src,
      title: attrs.Title,
      caption: attrs.Caption,
    }
  })

  if (badgeItems.length === 0) {
    // nothing to show
    return null
  }

  // 3. Render
  return (
    <section className={styles.badgeSection}>
      <div className={styles.container}>
        {badgeItems.map((item, i) => (
          <div key={i} className={styles.badgeItem}>
            <Image
              src={item.src}
              alt={item.title}
              width={60}
              height={60}
              className={styles.icon}
            />
            <h3 className={styles.title}>{item.title}</h3>
            {item.caption && (
              <p className={styles.caption}>{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

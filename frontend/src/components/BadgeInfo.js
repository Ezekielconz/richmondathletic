// components/BadgeInfo.jsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/badgeInfo.module.css'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') ||
  'http://localhost:1337'
const API_PREFIX =
  (process.env.NEXT_PUBLIC_STRAPI_API_PREFIX ?? '/api').replace(/\/?$/, '')

export default function BadgeInfo() {
  const [items, setItems] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchBadges() {
      try {
        const res = await fetch(
          `${API_URL}${API_PREFIX}/badges?populate=Icon&sort=Order:asc`
        )
        if (!res.ok) throw new Error('Failed to fetch badges')
        const { data } = await res.json()

        const badgeItems = (data || [])
          .map((entry) => {
            const attrs = entry.attributes ?? entry
            const icon = attrs.Icon ?? attrs.icon
            const urlPath =
              icon?.data?.attributes?.url ||
              icon?.data?.url ||
              icon?.url ||
              ''
            const src = urlPath
              ? urlPath.startsWith('http')
                ? urlPath
                : `${API_URL}${urlPath}`
              : ''
            return {
              src,
              title: attrs.Title ?? attrs.title ?? '',
              caption: attrs.Caption ?? attrs.caption ?? '',
            }
          })
          .filter((item) => item.src)

        if (!cancelled) {
          setItems(badgeItems)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      }
    }

    fetchBadges()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return null
  if (error) return <div>Unable to load badges.</div>
  if (items.length === 0) return null

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)
  const { src, title, caption } = items[current]

  return (
    <section className={styles.badgeSection}>
      {/* desktop view */}
      <div className={styles.container}>
        {items.map((item, i) => (
          <div key={i} className={styles.badgeItem}>
            <Image
              src={item.src}
              alt={item.title}
              width={60}
              height={60}
              className={styles.icon}
            />
            <h3 className={styles.title}>{item.title}</h3>
            {item.caption && <p className={styles.caption}>{item.caption}</p>}
          </div>
        ))}
      </div>

      {/* mobile carousel */}
      <div className={styles.carouselContainer}>
        <button
          className={styles.arrow}
          onClick={prev}
          aria-label="Previous badge"
        >
          ‹
        </button>

        <div className={styles.carouselItem}>
          <Image
            src={src}
            alt={title}
            width={60}
            height={60}
            className={styles.icon}
          />
          <h3 className={styles.title}>{title}</h3>
          {caption && <p className={styles.caption}>{caption}</p>}
        </div>

        <button
          className={styles.arrow}
          onClick={next}
          aria-label="Next badge"
        >
          ›
        </button>
      </div>
    </section>
  )
}

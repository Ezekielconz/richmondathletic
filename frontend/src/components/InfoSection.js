'use client';

import Image from 'next/image';
import styles from '../styles/infoSection.module.css';

/**
 * Generic two-column band that alternates content direction.
 *
 * @param {object}  props
 * @param {number}  props.index   – 0-based order on the page
 * @param {string}  props.imageSrc
 * @param {string}  props.title
 * @param {string}  props.body
 */
export default function InfoSection({ index = 0, imageSrc, title, body }) {
  const reversed = index % 2 === 1;          // even -> normal, odd -> reversed

  return (
    <section
      className={`${styles.infoSection} ${reversed ? styles.reverse : ''}`}
    >
      {/* --------  Image  -------- */}
      <div className={styles.imageWrap}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={styles.image}
          priority={index === 0}
        />
      </div>

      {/* --------  Copy  -------- */}
      <div className={styles.copy}>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </section>
  );
}

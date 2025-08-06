'use client';

import styles from '../styles/infoSection.module.css';

/**
 * Generic two-column band that alternates content direction.
 *
 * @param {object}  props
 * @param {number}  props.index     – 0-based order on the page
 * @param {string}  props.imageSrc
 * @param {string}  props.title
 * @param {string}  props.body
 */
export default function InfoSection({ index = 0, imageSrc, title, body }) {
  const reversed = index % 2 === 1;

  return (
    <section
      className={`${styles.infoSection} ${reversed ? styles.reverse : ''}`}
    >
      {/* the image half – CSS‐driven via var(--image-src) */}
      <div
        className={styles.imageWrap}
        style={{ '--image-src': `url(${imageSrc})` }}
      />

      {/* the text half */}
      <div className={styles.copy}>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </section>
  );
}

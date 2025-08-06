// InfoSection.jsx
'use client';

import styles from '../styles/infoSection.module.css';

export default function InfoSection({ index = 0, imageSrc, title, body }) {
  const reversed  = index % 2 === 1;
  const hasImage  = Boolean(imageSrc);

  return (
    <section
      className={[
        styles.infoSection,
        reversed ? styles.reverse : '',
        !hasImage ? styles.noImage : ''
      ].join(' ')}
    >
      {hasImage && (
        <div
          className={styles.imageWrap}
          style={{ '--image-src': `url(${imageSrc})` }}
        />
      )}

      <div className={styles.copy}>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </section>
  );
}

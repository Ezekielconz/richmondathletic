'use client';

import Image from 'next/image';
import styles from '../styles/productCard.module.css';

export default function ProductCard({ name, price, variant, image }) {
  // validate image URL
  const imgSrc = typeof image === 'string' && image.trim() !== ''
    ? image.trim()
    : null;

  // whole-dollar price
  const dollars = Math.round(Number(price) || 0);

  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(min-width: 768px) 200px, 45vw"
          />
        ) : (
          <div className={styles.noImage}>No image</div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>
          {name}
          {variant && <span className={styles.variant}>{variant}</span>}
        </h3>
        <h2 className={styles.price}>${dollars}</h2>
      </div>
    </article>
  );
}

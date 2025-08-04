'use client';

import Image from 'next/image';
import styles from '../styles/productCard.module.css';

const PLACEHOLDER = '/sponsors/placeholder.svg'; // reuse

export default function ProductCard({ name, price, variant, image }) {
  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          src={image || PLACEHOLDER}
          alt={name}
          fill
          sizes="(min-width: 768px) 200px, 45vw"
          className={styles.img}
        />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.meta}>
        {variant && <span className={styles.variant}>{variant}</span>}
        <span className={styles.price}>${price}</span>
      </p>
    </article>
  );
}

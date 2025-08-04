'use client';

import Image from 'next/image';
import styles from '../styles/hero.module.css';

/**
 * @param {string} [imageSrc] Optional path to a hero image in /public
 */
export default function Hero({ imageSrc }) {
  return (
    <section className={styles.hero}>
      {/* -------- Left (white) -------- */}
      <div className={styles.left}>
        <h1 className={styles.message}>
          SUPPORT<br />
          TOGETHER<br />
          RESPECT<br />
          INTEGRITY<br />
          VISION<br />
          EVERYONE!
        </h1>
      </div>

      {/* -------- Right (image or maroon) -------- */}
      <div className={styles.right}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Richmond Athletic in action"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={styles.heroImg}
            priority
          />
        )}
      </div>
    </section>
  );
}

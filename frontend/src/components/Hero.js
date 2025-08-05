// src/components/Hero.js
import Image from 'next/image';
import styles from '../styles/hero.module.css';

export default function Hero({ leftImage, rightImage }) {
  return (
    <section className={styles.hero}>
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

      <div className={styles.imageContainer}>
        {leftImage ? (
          <Image
            src={leftImage}
            alt="Hero left"
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className={styles.heroImg}
            priority
          />
        ) : (
          <div className={styles.fallback} />
        )}
      </div>

      <div className={styles.imageContainer}>
        {rightImage ? (
          <Image
            src={rightImage}
            alt="Hero right"
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className={styles.heroImg}
          />
        ) : (
          <div className={styles.fallback} />
        )}
      </div>
    </section>
  );
}

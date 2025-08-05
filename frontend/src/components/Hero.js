// src/components/Hero.js
import styles from '../styles/hero.module.css';

export default function Hero({ leftImage, rightImage }) {
  return (
    <section
      className={styles.hero}
      style={{
        "--left-image":  leftImage  ? `url(${leftImage})`  : "none",
        "--right-image": rightImage ? `url(${rightImage})` : "none",
      }}
    >
      <div className={styles.textContainer}>
        <h1 className={styles.message}>
          <span className={styles.glassWord}>SUPPORT</span><br/>
          <span className={styles.glassWord}>TOGETHER</span><br/>
          <span className={styles.glassWord}>RESPECT</span><br/>
          <span className={styles.glassWord}>INTEGRITY</span><br/>
          <span className={styles.glassWord}>VISION</span><br/>
          <span className={styles.glassWord}>EVERYONE!</span>
        </h1>
      </div>
    </section>
  );
}

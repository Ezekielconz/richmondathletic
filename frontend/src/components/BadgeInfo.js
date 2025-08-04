'use client';

import Image from 'next/image';
import styles from '../styles/badgeInfo.module.css';

const badgeItems = [
  {
    src: '/icons/shield.svg',
    title: 'THE SHIELD',
    caption: 'fef',
  },
  {
    src: '/icons/mountain.svg',
    title: 'MT. RICHMOND & THE RICHMOND RANGES',
    caption: '',
  },
  {
    src: '/icons/motto.svg',
    title: 'CLUB MOTTO & ESTABLISHMENT',
    caption: '“TASMAN PRIDE”',
  },
  {
    src: '/icons/football.svg',
    title: 'FOOTBALL ICON',
    caption: '',
  },
  {
    src: '/icons/stripes.svg',
    title: 'OUR CLUB UNITED AS ONE',
    caption: '',
  },
];

export default function BadgeInfo() {
  return (
    <section className={styles.badgeSection}>
      <div className={styles.container}>
        {badgeItems.map((item, index) => (
          <div key={index} className={styles.badgeItem}>
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
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/sponsorsSection.module.css';

const PLACEHOLDER = '/sponsors/placeholder.svg';

export default function SponsorsSection({ level, sponsors }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{level}</h2>

      <div className={styles.grid}>
        {sponsors.map((s) => (
          <div key={s.name} className={styles.card}>
            {s.url ? (
              <Link href={s.url} target="_blank" rel="noopener">
                <Image
                  src={s.logo ?? PLACEHOLDER}
                  alt={s.name}
                  fill
                  sizes="(min-width:768px) 200px, 40vw"
                  className={styles.logo}
                  priority={level === 'Major Club Sponsor'}
                />
              </Link>
            ) : (
              <Image
                src={s.logo ?? PLACEHOLDER}
                alt={s.name}
                fill
                sizes="(min-width:768px) 200px, 40vw"
                className={styles.logo}
              />
            )}

            {s.blurb && <p className={styles.blurb}>{s.blurb}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

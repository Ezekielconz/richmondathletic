'use client';

import Image from 'next/image';
import Link  from 'next/link';
import styles from '@/styles/sponsorsSection.module.css';

const PLACEHOLDER = '/sponsors/placeholder.svg';

export default function SponsorsSection({ level, sponsors }) {
  const isMajor = level === 'Major Club Sponsor';

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{level}</h2>

      {isMajor ? (
        <div className={styles.majorWrapper}>
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className={styles.majorCard}>
              {sponsor.url ? (
                <Link href={sponsor.url} target="_blank" rel="noopener">
                  <Image
                    src={sponsor.logo || PLACEHOLDER}
                    alt={sponsor.name}
                    width={200}
                    height={120}
                    className={styles.logo}
                  />
                </Link>
              ) : (
                <Image
                  src={sponsor.logo || PLACEHOLDER}
                  alt={sponsor.name}
                  width={200}
                  height={120}
                  className={styles.logo}
                />
              )}
              {sponsor.blurb && (
                <p className={styles.blurb}>{sponsor.blurb}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className={styles.card}>
              {sponsor.url ? (
                <Link href={sponsor.url} target="_blank" rel="noopener">
                  <Image
                    src={sponsor.logo || PLACEHOLDER}
                    alt={sponsor.name}
                    width={200}
                    height={120}
                    className={styles.logo}
                  />
                </Link>
              ) : (
                <Image
                  src={sponsor.logo || PLACEHOLDER}
                  alt={sponsor.name}
                    width={200}
                    height={120}
                  className={styles.logo}
                />
              )}
              {sponsor.blurb && (
                <p className={styles.blurb}>{sponsor.blurb}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ---------- Column 1 : location + socials ---------- */}
      <div className={styles.col}>
        <address className={styles.address}>
          Richmond Athletic AFC<br />
          Jubilee Park<br />
          Gladstone Road, Richmond
        </address>

        <div className={styles.social}>
          {/* swap hrefs for real club profiles */}
          <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
            <Image src="/icons/facebook.svg" alt="" width={20} height={20} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
            <Image src="/icons/instagram.svg" alt="" width={20} height={20} />
          </Link>
        </div>
      </div>

      {/* ---------- Column 2 : key contacts ---------- */}
      <div className={styles.col}>
        <p className={styles.contact}>
          Chris Sibbald – Club President:<br />
          <a href="mailto:president@richmondathletic.co.nz">
            president@richmondathletic.co.nz
          </a>
        </p>

        <p className={styles.contact}>
          Cherie Llewellin – Club Administrator:<br />
          <a href="mailto:admin@richmondathletic.co.nz">
            admin@richmondathletic.co.nz
          </a>
        </p>
      </div>

      {/* ---------- Column 3 : credit ---------- */}
      <div className={styles.col}>
        <p className={styles.credit}>
          Created & Designed By<br />
          <Link href="https://ezekiel.co.nz" target="_blank">
            Ezekiel
          </Link>
        </p>
      </div>
    </footer>
  );
}

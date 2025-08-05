// src/components/NavBar.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

/**
 * @param {{ logoUrl?: string }} props
 */
export default function NavBar({ logoUrl = '' }) {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logoLink}>
        {/* Guard against empty strings to avoid a 404 request from <Image/> */}
      {logoUrl && (
        <Image src={logoUrl} alt="Richmond AFC logo" width={40} height={40} priority />
      )}
      </Link>

      {/* ----  Links ---- */}
      <nav className={styles.menu}>
        <Link href="/">Home</Link>
        <Link href="/club">Club</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/sponsors">Sponsors</Link>
        <Link href="/registration" className={styles.registrationBtn}>
          2025&nbsp;Registration
        </Link>
      </nav>
    </header>
  );
}

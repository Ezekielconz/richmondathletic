// src/components/NavBar.js
'use client';
import Image from 'next/image';
import Link  from 'next/link';
import styles from '../styles/navbar.module.css';

export default function NavBar({ logo }) {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logoLink}>
        <Image src={logo} alt="Richmond Athletic FC logo" width={40} height={40} priority />
      </Link>

      {/* ----  Links ---- */}
      <nav className={styles.menu}>
        <Link href="/">Home</Link>
        <Link href="/club">Club</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/sponsors">Sponsors</Link>
        <Link href="/registration" className={styles.registrationBtn}>
          2025 Registration
        </Link>
      </nav>
    </header>
  );
}

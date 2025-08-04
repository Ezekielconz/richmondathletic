'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

export default function NavBar() {
  return (
    <header className={styles.nav}>
      {/* ----  Logo  ---- */}
      <Link href="/" className={styles.logoLink}>
        {/* swap logo.png for your actual logo asset in /public */}
        <Image
          src="/logo.png"
          alt="Richmond Athletic FC logo"
          width={40}
          height={40}
          priority
        />
      </Link>

      {/* ----  Desktop links  ---- */}
      <nav className={styles.menu}>
        <Link href="/">Home</Link>
        <Link href="/club">Club</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/sponsors">Sponsors</Link>
        <Link
          href="/registration-2025"
          className={styles.registrationBtn}
        >
          2025 Registration
        </Link>
      </nav>
    </header>
  );
}

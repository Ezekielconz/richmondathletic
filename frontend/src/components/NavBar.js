// src/components/NavBar.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/navbar.module.css';

export default function NavBar({ logoUrl = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logoLink} onClick={closeMenu}>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Richmond AFC logo"
            width={80}
            height={80}
            priority
          />
        )}
      </Link>

      {/* Hamburger for mobile */}
      <button
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
        <Link
          href="/"
          className={pathname === '/' ? styles.active : ''}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          href="/club"
          className={pathname === '/club' ? styles.active : ''}
          onClick={closeMenu}
        >
          Club
        </Link>
        <Link
          href="/shop"
          className={pathname === '/shop' ? styles.active : ''}
          onClick={closeMenu}
        >
          Shop
        </Link>
        <Link
          href="/sponsors"
          className={pathname === '/sponsors' ? styles.active : ''}
          onClick={closeMenu}
        >
          Sponsors
        </Link>
        <Link
          href="/registration"
          className={`
            ${styles.registrationBtn}
            ${pathname === '/registration' ? styles.active : ''}
          `}
          onClick={closeMenu}
        >
          2025 Registration
        </Link>
      </nav>
    </header>
  );
}

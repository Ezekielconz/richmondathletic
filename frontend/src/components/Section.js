'use client';

import { forwardRef } from 'react';
import styles from '../styles/section.module.css'; // create if you want overrides

/**
 * Reusable page section that creates an anchor link target and
 * handles consistent heading styling.
 *
 * @param {string}  id     – unique slug used in href="#id"
 * @param {string}  title  – visible section heading
 * @param {ReactNode} children
 */
const Section = forwardRef(function Section({ id, title, children }, ref) {
  return (
    <section ref={ref} id={id} className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </section>
  );
});

export default Section;

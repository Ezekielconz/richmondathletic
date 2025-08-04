'use client';

import styles from '../styles/feeTable.module.css';

/**
 * @param {{ rows: {label:string, price:string}[] }} props
 */
export default function FeeTable({ rows }) {
  return (
    <table className={styles.table}>
      <thead><tr><th>Grade</th><th>2025 Fee</th></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td>{r.label}</td>
            <td>${r.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

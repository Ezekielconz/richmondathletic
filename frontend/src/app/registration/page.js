import Section from '@/components/Section';
import FeeTable from '@/components/FeeTable';
import styles from '@/styles/registrationPage.module.css';

export const metadata = { title: '2025 Registration · Richmond Athletic FC' };
export const dynamic = 'force-dynamic'; // renders on demand; build never fails

/* ---- data ---- */
const FEES = [
  { label: '1st Kicks (4-6 yrs)',                     price: '60'  },
  { label: 'Fun Football (7-8 yrs)',                  price: '90'  },
  { label: 'Junior Football (9-12 yrs)',              price: '135' },
  { label: 'Youth Football (13-19 yrs)',              price: '155' },
  { label: 'Youth in Senior Women (16-19 yrs)',       price: '165' },
  { label: 'Youth in Senior Men (16-19 yrs)',         price: '185' },
  { label: 'Senior Women (20+)',                      price: '210' },
  { label: 'Senior Men (20+)',                        price: '240' },
];

export default function RegistrationPage() {
  return (
    <main className={styles.page}>
      {/* ---------- HERO ---------- */}
      <header className={styles.hero}>
        <h1>2025 Registrations&nbsp;Now&nbsp;Open</h1>
        <p>
          Playing&nbsp;and&nbsp;non-playing memberships are due by&nbsp;
          <strong>31 March 2025</strong>.
          <br />
          Questions? Email&nbsp;
          <a href="mailto:admin@richmondathletic.co.nz">Cherie</a> or&nbsp;
          <a href="mailto:president@richmondathletic.co.nz">Chris</a>.
        </p>
      </header>

      {/* ---------- FEES ---------- */}
      <Section id="fees" title="Player Fees">
        <FeeTable rows={FEES} />
        <p className={styles.note}>
          All players must be registered and paid <em>or</em> have an arrangement
          with the club before they are eligible to play.
        </p>
      </Section>

      {/* ---------- PLAYER REG ---------- */}
      <Section id="player" title="Playing Registration">
        <ol className={styles.steps}>
          <li>
            We use <strong>Sporty</strong> (integrated with NZ Football’s COMET).
            Returning players received an email with a personalised link —
            click it to pre-fill your details.
          </li>
          <li>
            New to Richmond?&nbsp;
            <a href="https://example.sporty.co.nz/register" target="_blank">
              Register here&nbsp;↗
            </a>
            &nbsp;and choose your grade. You can add multiple family members
            before submitting.
          </li>
          <li>
            Complete payment online (credit, bank-to-bank) or choose&nbsp;
            <em>Pay&nbsp;Later</em> and use the bank details below.
          </li>
        </ol>
      </Section>

      {/* ---------- NON-PLAYING ---------- */}
      <Section id="member" title="Club Member (Non-Playing)">
        <p>
          Support the club off the field by registering as a&nbsp;
          <em>Volunteer</em>. Use the same Sporty form:
          &nbsp;
          <a href="https://example.sporty.co.nz/member" target="_blank">
            Non-Playing Registration&nbsp;↗
          </a>
        </p>
      </Section>

      {/* ---------- BANK ---------- */}
      <Section id="bank" title="Bank Details">
        <p>
          If you selected <em>Pay&nbsp;Later</em> please transfer to:<br />
          <strong>ASB Bank – 12-3158-0088958-00</strong><br />
          <small>
            Use the player’s name and grade as the reference.
          </small>
        </p>
      </Section>

      {/* ---------- HELP ---------- */}
      <Section id="help" title="Troubleshooting & Policies">
        <ul className={styles.list}>
          <li>
            Registration issues?&nbsp;
            <a href="mailto:admin@richmondathletic.co.nz">
              admin@richmondathletic.co.nz
            </a>
          </li>
          <li>
            By registering you agree to the&nbsp;
            <a href="/pdfs/code-of-conduct.pdf" target="_blank">
              Club &amp; NZF Code of Conduct
            </a>.
          </li>
        </ul>
      </Section>
    </main>
  );
}

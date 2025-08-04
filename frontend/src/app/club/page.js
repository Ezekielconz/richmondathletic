import Section from '@/components/Section';
import styles  from '@/styles/clubPage.module.css';

export const metadata = { title: 'Our Club · Richmond Athletic FC' };

/* ──────────────────────────────────────────────────────────
   NOTE: All content is inline markdown / JSX for now.
   When Strapi entries are ready you can fetch them here
   and pass the rich text to <Section>.
   ────────────────────────────────────────────────────────── */

export default function ClubPage() {
  return (
    <main className={styles.page}>
      {/* ---------- sticky in-page nav ---------- */}
      <nav className={styles.toc}>
        {[
          ['history',   'History'],
          ['members',   'Our Members'],
          ['sponsor',   'Sponsorship'],
          ['vision',    'Vision'],
          ['ambassadors','Ambassadors'],
          ['gov',       'Governing Bodies'],
          ['committee', 'Committee'],
          ['docs',      'Documents & Policies'],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>

      {/* ---------- Sections ---------- */}
      <Section id="history" title="Club History">
        <p>
          <strong>Established in 1964</strong>, Richmond Athletic AFC was formed
          when two local clubs merged. The home ground has been Jubilee Park
          ever since&hellip;
        </p>
        <p>
          {/* — condensed narrative, keep paragraphs short for readability — */}
          Richmond enjoyed promotion to the Mainland Premier League in&nbsp;2006,
          reached the 4<sup>th</sup> round of the Chatham Cup twice, and in&nbsp;2014
          celebrated its 50<sup>th</sup> anniversary with more than&nbsp;150 past and
          present members. Today the club fields <em>40 first-kickers, 21 junior,
          4 youth, 2 women’s and 5 men’s teams</em> across three park venues.
        </p>
        <blockquote className={styles.quote}>
          “To the faithful gathered here tonight&hellip;” &mdash; excerpt from Stu
          Reid’s&nbsp;50<sup>th</sup> Anniversary poem.
        </blockquote>
      </Section>

      <Section id="members" title="Our Members">
        <p>
          Seasons bring highs and lows, but one constant is the people who make
          Richmond Athletic a family-friendly club where every player can enjoy
          the game, whatever their level.
        </p>
      </Section>

      <Section id="sponsor" title="Sponsorship">
        <p>
          As a large community club we rely on the generosity of local
          businesses and individuals. While we can’t promise commercial return,
          sponsors become part of a legacy that keeps kids playing in proper
          gear. Interested?&nbsp;
          <a href="mailto:sponsors@richmondathletic.co.nz">Get our package</a>.
        </p>
      </Section>

      <Section id="vision" title="Vision Statement">
        <p className={styles.vision}>
          “To create a competitive club with strong family values that
          encourages the community to engage with the sport for life.”
        </p>
      </Section>

      <Section id="ambassadors" title="Ambassadors of Football">
        <ul className={styles.list}>
          <li>
            <strong>Jeremy Brockie</strong> – current All White, striker for
            SuperSport&nbsp;United (South Africa); Richmond junior alumni.
          </li>
          <li>
            <strong>Emily Jensen</strong> – NZ U-20 international and Santa Clara
            University scholar; former Nelson local.
          </li>
        </ul>
      </Section>

      <Section id="gov" title="Governing Bodies">
        <p>
          Richmond Athletic is affiliated to&nbsp;
          <abbr title="Fédération Internationale de Football Association">FIFA</abbr>
          &nbsp;via New Zealand Football and operates under Mainland Football /
          Nelson Bays Football at district level.
        </p>
      </Section>

      <Section id="committee" title="2023 Committee & Key Roles">
        <table className={styles.table}>
          <thead><tr><th>Role</th><th>Name</th><th>Contact</th></tr></thead>
          <tbody>
            <tr><td>President</td><td>Chris Sibbald</td><td><a href="mailto:president@richmondathletic.co.nz">president@&hellip;</a></td></tr>
            <tr><td>Secretary</td><td>TBC</td><td>&mdash;</td></tr>
            <tr><td>Treasurer</td><td>Heidi Tapper</td><td><a href="mailto:treasurer@richmondathletic.co.nz">treasurer@&hellip;</a></td></tr>
            <tr><td>Administrator</td><td>Cherie Llewellin</td><td><a href="mailto:admin@richmondathletic.co.nz">admin@&hellip;</a></td></tr>
            <tr><td>Sponsorship</td><td>Gerard Clark</td><td><a href="mailto:sponsors@richmondathletic.co.nz">sponsors@&hellip;</a></td></tr>
            <tr><td>Patron</td><td>John White</td><td>&mdash;</td></tr>
          </tbody>
        </table>

        <h3 className={styles.subhead}>Committee Members</h3>
        <p>Nick Rose · Mikayla Stanbridge-Brien · Chris Goff · Sam Barnett · Holly de Cesare · Bryan Llewellin · Dave Millson</p>
      </Section>

      <Section id="docs" title="Documents, Policies & Links">
        <ul className={styles.list}>
          <li><a href="/pdfs/football-resources.pdf" target="_blank">Football &amp; Coaching Resources</a></li>
          <li><a href="/pdfs/code-of-conduct.pdf" target="_blank">Code of Conduct</a></li>
          <li><a href="/pdfs/social-media-policy.pdf" target="_blank">Social Media Policy</a></li>
          <li><a href="/pdfs/complaints-form.pdf"       target="_blank">Complaint / Incident Form</a></li>
        </ul>
      </Section>
    </main>
  );
}

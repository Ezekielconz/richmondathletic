import SponsorsSection from '@/components/SponsorsSection';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';
import styles from '@/styles/sponsorsPage.module.css';

/* Render on demand so the build never fails */
export const dynamic = 'force-dynamic';

/* Map enum ➜ heading */
const LEVEL_LABELS = {
  'major-club':    'Major Club Sponsor',
  'club':          'Club Sponsors',
  'senior-team':   'Senior Team Sponsors',
  'youth-junior':  'Youth & Junior Team Sponsors',
  'funding-trust': 'Funding Foundations & Trusts',
};

/* Display order */
const LEVEL_ORDER = [
  'major-club',
  'club',
  'senior-team',
  'youth-junior',
  'funding-trust',
];

async function getSponsorsGrouped() {
  const json = await fetchStrapi('/sponsors', {
    params: { populate: 'logo', sort: ['level', 'sortOrder'] },
    next:   { revalidate: 60 * 60 * 4, tags: ['sponsors'] },
  });

  const groups = {};
  json.data.forEach((item) => {
    const { name, url, blurb, level } = item.attributes;
    const logo = getMediaURL(item.attributes.logo);
    (groups[level] ||= []).push({ name, url, blurb, logo });
  });

  return LEVEL_ORDER
    .filter((lvl) => groups[lvl]?.length)
    .map((lvl) => ({
      level: LEVEL_LABELS[lvl],
      sponsors: groups[lvl],
    }));
}

export const metadata = { title: 'Our Sponsors · Richmond Athletic FC' };

export default async function SponsorsPage() {
  let sponsorGroups = [];
  try {
    sponsorGroups = await getSponsorsGrouped();
  } catch (e) {
    console.error('SponsorsPage →', e);
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Our Sponsors</h1>
        <p>
          Some of the most important people in our club are our sponsors. Their
          generosity keeps us thriving on and off the pitch. If you’re
          interested in joining our sponsor family, contact&nbsp;
          <a href="mailto:sponsorship@richmondathletic.co.nz">Ged Clark</a>{' '}
          for our sponsorship packages.
        </p>
      </header>

      {sponsorGroups.length ? (
        sponsorGroups.map((g) => (
          <SponsorsSection
            key={g.level}
            level={g.level}
            sponsors={g.sponsors}
          />
        ))
      ) : (
        <section className={styles.hero}>
          <p>We’re still finalising sponsor details—check back soon!</p>
        </section>
      )}
    </main>
  );
}

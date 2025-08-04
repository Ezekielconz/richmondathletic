import SponsorsSection from '@/components/SponsorsSection';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';
import styles from '@/styles/sponsorsPage.module.css';

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
  const data = await fetchStrapi('/sponsors', {
    params: {
      populate: 'logo',
      sort: ['level', 'sortOrder'],
    },
    next: { revalidate: 60 * 60 * 4, tags: ['sponsors'] },
  });

  const groups = {};
  data.data.forEach((item) => {
    const { name, url, blurb, level } = item.attributes;
    const logo = getMediaURL(item.attributes.logo);

    if (!groups[level]) groups[level] = [];
    groups[level].push({ name, url, blurb, logo });
  });

  return LEVEL_ORDER
    .filter((lvl) => groups[lvl]?.length)
    .map((lvl) => ({
      level: LEVEL_LABELS[lvl],
      sponsors: groups[lvl],
    }));
}

export const metadata = {
  title: 'Our Sponsors · Richmond Athletic FC',
};

export default async function SponsorsPage() {
  const sponsorGroups = await getSponsorsGrouped();

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Our Sponsors</h1>
        <p>
          Some of the most important people in our club are our sponsors. Their
          generosity keeps us thriving on and off the pitch. If you’re
          interested in joining our sponsor family, contact&nbsp;
          <a href="mailto:sponsorship@richmondathletic.co.nz">
            Ged Clark
          </a>{' '}
          for our sponsorship packages.
        </p>
      </header>

      {sponsorGroups.map((g) => (
        <SponsorsSection key={g.level} level={g.level} sponsors={g.sponsors} />
      ))}
    </main>
  );
}

// src/app/sponsors/page.js
import SponsorsSection             from '@/components/SponsorsSection';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';
import styles                       from '@/styles/sponsorsPage.module.css';

export const dynamic = 'force-dynamic'; // don’t break the build if Strapi is down

const LEVEL_LABELS = {
  'major-club':    'Major Club Sponsor',
  'club':          'Club Sponsors',
  'senior-team':   'Senior Team Sponsors',
  'youth-junior':  'Youth & Junior Team Sponsors',
  'funding-trust': 'Funding Foundations & Trusts',
};

const LEVEL_ORDER = [
  'major-club',
  'club',
  'senior-team',
  'youth-junior',
  'funding-trust',
];

async function getSponsorsGrouped() {
  const json = await fetchStrapi('/sponsors', {
    params: { populate: '*' },
    next:   { revalidate: 60 * 60 * 4, tags: ['sponsors'] },
  });

  const groups = {};
  (json.data || []).forEach((item) => {
    const attrs = item.attributes ?? item;
    const sponsor = {
      name:  attrs.name      ?? attrs.Name      ?? '',
      url:   attrs.websiteURL ?? attrs.WebsiteURL ?? attrs.url ?? '',
      blurb: attrs.blurb     ?? attrs.Blurb     ?? '',
      logo:  getMediaURL(attrs.logo?.data ?? attrs.Logo),
    };
    const level = attrs.level ?? attrs.Level ?? 'club';
    (groups[level] ||= []).push(sponsor);
  });

  return LEVEL_ORDER
    .filter((lvl) => groups[lvl]?.length)
    .map((lvl) => ({
      level:    LEVEL_LABELS[lvl],
      sponsors: groups[lvl],
    }));
}

export default async function SponsorsPage() {
  let sponsorGroups = [];
  try {
    sponsorGroups = await getSponsorsGrouped();
  } catch (err) {
    console.error('SponsorsPage →', err);
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Our Sponsors</h1>
        <p>
          Some of the most important people in our club are our sponsors. Their
          generosity keeps us thriving on and off the pitch. If you’re
          interested in joining our sponsor family, contact{' '}
          <a href="mailto:sponsorship@richmondathletic.co.nz">Ged Clark</a> for
          our sponsorship packages.
        </p>
      </header>

      {sponsorGroups.length ? (
        sponsorGroups.map((group) => (
          <SponsorsSection
            key={group.level}
            level={group.level}
            sponsors={group.sponsors}
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

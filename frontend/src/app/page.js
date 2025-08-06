// src/app/page.js
import Hero         from '@/components/Hero';
import BadgeInfo    from '@/components/BadgeInfo';
import InfoSection  from '@/components/InfoSection';
import { getHeroSettings, getInfoSections } from '@/lib/strapi';

export default async function Home() {
  // 1) fetch hero images
  const { leftImage, rightImage } = await getHeroSettings();

  // 2) fetch your info sections from Strapi
  const sections = await getInfoSections();

  return (
    <>
      <Hero leftImage={leftImage} rightImage={rightImage} />
      <BadgeInfo />

      {/* 3) loop over sections */}
      {sections.map((sec, i) => (
        <InfoSection
          key={i}
          index={i}
          imageSrc={sec.imageSrc}
          title={sec.title}
          body={sec.body}
        />
      ))}
    </>
  );
}

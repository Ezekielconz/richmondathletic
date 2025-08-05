// src/app/page.js
import Hero      from '@/components/Hero';
import BadgeInfo from '@/components/BadgeInfo';
import InfoSection from '@/components/InfoSection';
import { getHeroSettings } from '@/lib/strapi';

export default async function Home() {
  const { leftImage, rightImage } = await getHeroSettings();

  return (
    <>
      <Hero leftImage={leftImage} rightImage={rightImage} />
      <BadgeInfo />
      <InfoSection
        index={0}
        imageSrc="/photos/academy.jpg"
        title="Our Junior Academy"
        body="Developing young talent with certified coaches and a proven curriculum."
      />

      <InfoSection
        index={1}
        imageSrc="/photos/community.jpg"
        title="Community First"
        body="From charity events to local school programs, giving back is at our core."
      />

      <InfoSection
        index={2}
        imageSrc="/photos/facilities.jpg"
        title="World-Class Facilities"
        body="A recently upgraded clubhouse, new turf pitches, and an elite-level gym."
      />
    </>
  );
}

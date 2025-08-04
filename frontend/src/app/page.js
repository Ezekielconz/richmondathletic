import Hero      from '@/components/Hero';
import BadgeInfo from '@/components/BadgeInfo';
import InfoSection from '@/components/InfoSection';

export default function Home() {
  return (
    <>
      <Hero imageSrc="/hero.jpg" />
      <BadgeInfo />

      {/* 1️⃣ image left  */}
      <InfoSection
        index={0}
        imageSrc="/photos/academy.jpg"
        title="Our Junior Academy"
        body="Developing young talent with certified coaches and a proven curriculum."
      />

      {/* 2️⃣ image right */}
      <InfoSection
        index={1}
        imageSrc="/photos/community.jpg"
        title="Community First"
        body="From charity events to local school programs, giving back is at our core."
      />

      {/* 3️⃣ image left again */}
      <InfoSection
        index={2}
        imageSrc="/photos/facilities.jpg"
        title="World-Class Facilities"
        body="A recently upgraded clubhouse, new turf pitches, and an elite-level gym."
      />
    </>
  );
}

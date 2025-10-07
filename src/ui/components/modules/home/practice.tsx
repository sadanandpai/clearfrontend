import Link from 'next/link';
import Image from 'next/image';
import { Flex } from '@radix-ui/themes';
import { routes } from '@/common/routes';
import { InfoCard } from '@/ui/components/core/info-card/info-card';
import classes from './home.module.scss';

export function Practice() {
  return (
    <section>
      <div className={classes.practiceContainer}>
        <div className={classes.sectionTitle}>
          <Flex align="center" gap="4">
            Nail
            <Image src="target.svg" alt="target" width="64" height="64" className="inline" />
          </Flex>
          <span>
            that next
            <br /> interview
          </span>

          <br />

          <Link href={routes.challenges} className="primary-link large inline-block mt-24">
            PRACTICE NOW &gt;
          </Link>
        </div>

        <div className={classes.infoCards}>
          <div className={classes.infoCard}>
            <InfoCard
              title="Community driven challenges"
              description="Carefully curated high quality problems"
              image="community.svg"
              alt="community"
            />
          </div>
          <div className={classes.infoCard}>
            <InfoCard
              title="Beginner or pro, let’s go!"
              description="Challenges for every level of expertise"
              image="individual.svg"
              alt="individual"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

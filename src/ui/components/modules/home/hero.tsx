import { routes } from '@/common/routes';
import Link from 'next/link';
import classes from './home.module.scss';

export function Hero() {
  return (
    <section>
      <h1 className={classes.title}>
        <span className="text-brand-1">Learn.</span>
        <br />
        <span className="text-brand-3">Succeed.</span>
        <br />
        <span className="text-bg-2">Contribute.</span>
      </h1>

      <h2 className={`${classes.subTitle} mt-[44px] mb-[64px]`}>
        Master your frontend skills with{' '}
        <span className="text-brand-1 font-bold">Clear Frontend</span>
      </h2>

      <Link href={routes.challenges} className="primary-link large inline-block">
        CHALLENGES &gt;
      </Link>
    </section>
  );
}

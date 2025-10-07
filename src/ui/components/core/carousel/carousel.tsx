'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import classes from './carousel.module.scss';

interface Props {
  children: React.ReactNode[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export function EmblaCarousel({ children, activeIndex, setActiveIndex }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: activeIndex,
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      });
    }

    // cleanup is not necessary as carousel unmount will remove the event listener
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi]);

  return (
    <div className={classes.embla} ref={emblaRef}>
      <div className={classes.emblaContainer}>
        {children.map((child, idx) => (
          <div key={idx} className={classes.emblaSlide}>
            {child}
          </div>
        ))}
      </div>

      <div className={classes.emblaDots}>
        {children.map((_, idx) => (
          <button
            key={idx}
            className={`${classes.emblaDot} ${idx === activeIndex ? classes.isSelected : ''}`}
            onClick={() => emblaApi?.scrollTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}

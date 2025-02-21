import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { CarouselApi } from './ui/carousel';

function Indicators({ api }: { api: CarouselApi }) {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <ul className="mt-pr-16 flex justify-center gap-pr-6">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={classNames(
            current - 1 === index ? 'bg-t-primary' : 'bg-b-tertiary',
            'size-pr-8 rounded-full transition-all duration-300',
          )}
        ></li>
      ))}
    </ul>
  );
}

export default Indicators;

import { useObservable } from '@ngneat/use-observable';
import { useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { items$, scrollTop$, setScrollTop } from '@/lib/store';

import Container from '@/components/Container';
import Preview from '@/components/Preview';

const Home = () => {
  const [lock, setLock] = useState(false);
  const [items] = useObservable(items$);

  const galleryRef = useRef<HTMLElement>(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);

  useEffect(() => {
    const el = galleryRef.current;
    if (el) {
      const scrollbar = Scrollbar.init(el, {
        delegateTo: window,
        alwaysShowTracks: true
      });

      scrollbarRef.current = scrollbar;

      const subscription = scrollTop$.subscribe((v) => {
        scrollbar.scrollTo(0, v, 500);
      });
      subscription.unsubscribe();

      return () => {
        scrollbar.destroy();
      };
    }
  }, [galleryRef.current]);

  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    if (!scrollbar) return;

    const handler = () => {
      if (lock) return;

      setScrollTop(scrollbar.scrollTop);
    };

    scrollbar.addListener(handler);

    return () => {
      scrollbar.removeListener(handler);
    };
  }, [scrollbarRef.current, lock]);

  return (
    <Container>
      <section className="px-8 md:px-0 pt-8 h-screen flex flex-col">
        <h1 className="text-3xl font-semibold mb-8">Wallpapers</h1>

        <section ref={galleryRef} className="w-full overflow-y-auto pb-8 pr-4">
          <section className="relative grid lg:grid-cols-2 gap-4 justify-center">
            {items.map((item) => (<Preview key={item.id} {...item} onClick={() => setLock(true)} />))}
          </section>
        </section>
      </section>
    </Container>
  );
};

export default Home;

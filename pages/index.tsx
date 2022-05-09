import { useObservable } from '@ngneat/use-observable';
import { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { items$ } from '@/lib/store';

import Container from '@/components/Container';
import Preview from '@/components/Preview';

const Home = () => {
  const [items] = useObservable(items$);

  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = galleryRef.current;

    if (el) {
      const scrollbar = Scrollbar.init(el, {
        wheelEventTarget: window
      });

      return () => scrollbar.destroy();
    }
  }, [galleryRef]);

  return (
    <Container>
      <section className="pt-12 h-screen flex flex-col">
        <h1 className="text-3xl font-semibold mb-8">Wallpapers</h1>

        <section ref={galleryRef} className=" w-full overflow-y-auto pb-8 pr-4">
          <section className="relative grid lg:grid-cols-2 gap-4">
            {items.map((item) => (<Preview key={item.id} {...item} />))}
          </section>
        </section>
      </section>
    </Container>
  );
};

export default Home;

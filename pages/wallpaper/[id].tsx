import { useRouter } from 'next/router';
import { useObservable } from '@ngneat/use-observable';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiLinkExternal } from 'react-icons/bi';
import Container from '@/components/Container';
import { items$ } from '@/lib/store';
import NotFound from '@/components/NotFound';
import { Item } from '@/lib/types';

const Wallpaper = () => {
  const { query } = useRouter();

  const [items] = useObservable(items$);
  const [item, setItem] = useState<Item | undefined>();

  useEffect(() => {
    setItem(items.find((v) => v.id === query.id));
  }, [query, items]);

  if (!item) return <NotFound />;

  return (
    <Container>
      <section className="py-8 px-24 h-full flex flex-col items-center">
        <span className="mb-4">
          <Image className="rounded-lg drop-shadow-lg" width="1920" height="1080" src={item.url} objectFit="contain" />
        </span>

        <section className="flex justify-between w-full px-4">
          <section>
            btn
          </section>

          <section>
            <a href={item.source} target="_blank" referrerPolicy="no-referrer">
              <BiLinkExternal className="text-xl" />
            </a>
          </section>
        </section>
      </section>
    </Container>
  );
};

export default Wallpaper;
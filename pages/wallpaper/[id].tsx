import { useRouter } from 'next/router';
import { useObservable } from '@ngneat/use-observable';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { BiLinkExternal, BiMemoryCard } from 'react-icons/bi';
import { saveAs } from 'file-saver';
import Container from '@/components/Container';
import { items$ } from '@/lib/store';
import NotFound from '@/components/NotFound';
import { Item } from '@/lib/types';
import GoBack from '@/components/GoBack';
import Button from '@/components/Button';
import { BLUR_DATA } from '@/components/Preview';
import formatBytes from '@/lib/utils/formatBytes';

const Wallpaper = () => {
  const { query } = useRouter();

  const [items] = useObservable(items$);
  const [item, setItem] = useState<Item | undefined>();

  const iconClassName = useMemo(() => 'text-2xl opacity-75 hover:opacity-100 transition-opacity duration-300 ease-out', []);
  const iconsRowClassName = useMemo(() => 'flex gap-2 items-center', []);

  useEffect(() => {
    setItem(items.find((v) => v.id === query.id));
  }, [query, items]);

  if (!item) return <NotFound />;

  const download = async () => {
    const blob = await fetch(item.url).then((res) => res.blob());
    saveAs(blob, item.name);
  };

  return (
    <Container>
      <section className="py-8 px-8 md:px-24 lg:px-32 h-full flex flex-col items-center">
        <section className="self-start mb-6 mt-2">
          <GoBack />
        </section>

        <section className="relative mb-4 rounded-none hover:rounded-lg overflow-hidden transition-all duration-300 ease-in-out flex">
          <section className="absolute w-full h-full z-10 px-8 py-6 flex flex-col items-end">
            {item.size >= 4 * 1000 * 1000 && (<h3 className="text-2xl md:text-3xl font-bold text-slate-200 opacity-75 drop-shadow-md">4K</h3>)}
          </section>

          <Image
            className="drop-shadow-lg"
            width="1920"
            height="1080"
            src={item.url}
            objectFit="contain"
            placeholder="blur"
            blurDataURL={BLUR_DATA[Math.floor(Math.random() * BLUR_DATA.length)]}
          />
        </section>

        <section className="flex justify-between w-full">
          <section className="flex flex-col gap-2">
            <span className={iconsRowClassName}>
              <BiMemoryCard className={iconClassName} />
              <span className="font-medium">{formatBytes(item.size, true)}</span>
            </span>

            <a href={item.source} target="_blank" rel="noopener noreferrer nofollow" className={iconsRowClassName}>
              <BiLinkExternal className={iconClassName} />
              <span className="font-medium">Source</span>
            </a>
          </section>

          <section>
            <Button onClick={download}>Download</Button>
          </section>
        </section>
      </section>
    </Container>
  );
};

export default Wallpaper;
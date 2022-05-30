import { useRouter } from 'next/router';
import { useObservable } from '@ngneat/use-observable';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { BiLinkExternal, BiMemoryCard } from 'react-icons/bi';
import { GiSaucepan } from 'react-icons/gi';
import { saveAs } from 'file-saver';
import Container from '@/components/Container';
import { items$ } from '@/lib/store';
import NotFound from '@/components/NotFound';
import { Item } from '@/lib/types';
import GoBack from '@/components/GoBack';
import Button from '@/components/Button';
import { BLUR_DATA } from '@/components/Preview';
import formatBytes from '@/lib/utils/formatBytes';
import ProgressModal from '@/components/ProgressModal';

const Wallpaper = () => {
  const { query } = useRouter();

  const [items] = useObservable(items$);
  const [item, setItem] = useState<Item | undefined>();

  const [isOpen, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState(0);

  const iconClassName = useMemo(() => 'text-2xl opacity-75 hover:opacity-100 transition-opacity duration-300 ease-out', []);
  const iconsRowClassName = useMemo(() => 'flex gap-2 items-center', []);

  useEffect(() => {
    setItem(items.find((v) => v.id === query.id));
  }, [query, items]);

  if (!item) return <NotFound />;

  const download = async () => {
    setProgress(0);
    setSize(item.size);

    const res = await fetch(item.url);
    const reader = res.body?.getReader();

    if (!reader) return;

    const array = new Uint8Array(item.size);
    let count = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read();
      if (done) break;

      array.set(value, count);
      count += value.length;

      setProgress(count);
    }

    saveAs(new Blob([array]), item.name);
  };

  return (
    <>
      <ProgressModal isOpen={isOpen} setOpen={setOpen} progress={progress} size={size} retry={download} />

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

              <a href={`https://saucenao.com/search.php?url=${encodeURIComponent(item.url)}`} target="_blank" rel="noopener noreferrer nofollow" className={iconsRowClassName}>
                <GiSaucepan className={iconClassName} />
                <span className="font-medium">SauceNAO</span>
              </a>
            </section>

            <section>
              <Button onClick={() => { download(); setOpen(true); }}>Download</Button>
            </section>
          </section>
        </section>
      </Container>
    </>
  );
};

export default Wallpaper;
import { useObservable } from '@ngneat/use-observable';
import { items$ } from '@/lib/store';

import Container from '@/components/Container';

const Home = () => {
  const [items] = useObservable(items$);

  console.log(items);

  return (
    <Container className="h-screen mx-auto">
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Wallpapers</h1>
      </section>
    </Container>
  );
};

export default Home;

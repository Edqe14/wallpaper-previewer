import Container from './Container';
import GoBack from './GoBack';

const NotFound = () => (
  <Container>
    <section className="flex flex-col py-16">
      <GoBack />
    </section>
  </Container>
);

export default NotFound;
import Router from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Container from './Container';

const NotFound = () => (
  <Container>
    <section className="flex flex-col py-16">
      <span onClick={() => Router.back()} className="flex items-center gap-2 cursor-pointer">
        <AiOutlineArrowLeft className="text-lg" />
        <p>Go back</p>
      </span>
    </section>
  </Container>
);

export default NotFound;
import Router from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const GoBack = () => (
  <span onClick={() => Router.back()} className="flex items-center gap-2 cursor-pointer text-slate-400 transition-colors duration-300 ease-in-out hover:text-slate-300">
    <AiOutlineArrowLeft className="text-lg" />
    <p>Go back</p>
  </span>
);

export default GoBack;
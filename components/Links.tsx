import { useObservable } from '@ngneat/use-observable';
import { AiFillGithub } from 'react-icons/ai';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useMemo } from 'react';
import { theme$, toggleTheme } from '@/lib/store';

const Links = () => {
  const [theme] = useObservable(theme$);

  const toggleThemeClassName = useMemo(() => 'cursor-pointer text-3xl opacity-75 hover:opacity-100 transition-opacity duration-300 ease-in-out', []);

  return (
    <section className="absolute top-8 right-8 flex md:flex-col gap-4 items-center justify-center">
      {theme === 'dark' && (<BsFillSunFill className={toggleThemeClassName} onClick={toggleTheme} />)}
      {theme === 'light' && (<BsFillMoonFill className={toggleThemeClassName} onClick={toggleTheme} />)}

      <a target="_blank" rel="noopener noreferrer nofollow" className={toggleThemeClassName} href="https://github.com/Edqe14/wallpaper-previewer">
        <AiFillGithub className="text-3xl" />
      </a>
    </section>
  );
};

export default Links;
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react';

const Container = ({ className, ...rest }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const classNames = useMemo(() => [
    'md:w-4/5 lg:w-3/4 min-h-full',
    'h-screen mx-auto',
    className
  ].filter(Boolean).join(' ').trim(), [className]);

  return <main {...rest} className={classNames} />;
};

export default Container;
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react';

const Container = ({ className, ...rest }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const classNames = useMemo(() => [
    'w-2/3 min-h-full',
    className
  ].filter(Boolean).join(' ').trim(), [className]);

  return <main {...rest} className={classNames} />;
};

export default Container;
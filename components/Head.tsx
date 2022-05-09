import NextHead from 'next/head';

interface Props {
  title?: string;
}

const Head = ({ title }: Props) => (
  <NextHead>
    <title>Wallpapers | {title ?? 'Home'}</title>
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
  </NextHead>
);

export default Head;
import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from 'react';

type Variant = 'primary';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: Variant;
}

const classNames: Record<Variant, string> = {
  'primary': 'text-white bg-blue-600 hover:bg-blue-700'
};

const Button = ({ variant = 'primary', className: customClass, ...rest }: Props) => {
  const className = useMemo(() => [
    // base style
    'px-6 py-2 cursor-pointer hover:rounded-md transition-all duration-300 ease-in-out font-medium outline-none border-none',
    classNames[variant],
    customClass
  ].filter(Boolean).join(' '), [variant]);

  return (
    <button {...rest} className={className} />
  );
};

export default Button;
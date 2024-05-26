import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Title: React.FC<TitleProps> = ({
  children,
  size = 'medium',
  level = 1,
}) => {
  let sizeClasses = '';
  switch (size) {
    case 'small':
      sizeClasses = 'text-xl';
      break;
    case 'medium':
      sizeClasses = 'text-4xl';
      break;
    case 'large':
      sizeClasses = 'text-6xl';
      break;
  }

  const Heading = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Heading
      className={`${sizeClasses} font-bold font-serif leading-snug mt-4 mb-8`}
    >
      {children}
    </Heading>
  );
};

export default Title;

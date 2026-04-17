import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  className?: string;
}

const Card = ({ className = '', children }: CardProps) => {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_8px_30px_rgb(15,23,42,0.06)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
};

export default Card;
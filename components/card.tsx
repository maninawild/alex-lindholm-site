type CardProps = {
  title: string;
  text: string;
};

export function Card({ title, text }: CardProps) {
  return (
    <article className="min-h-[200px] bg-bone p-6 transition duration-300 hover:bg-paper sm:p-7">
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      <p className="mt-5 text-sm leading-7 text-graphite/70">{text}</p>
    </article>
  );
}

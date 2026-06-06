type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  inverted?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  inverted = false,
}: SectionHeaderProps) {
  return (
    <header>
      <p
        className={`text-[0.72rem] font-medium uppercase tracking-[0.18em] ${
          inverted ? "text-bone/62" : "text-copper"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-medium leading-tight tracking-[-0.015em] text-balance sm:text-4xl ${
          inverted ? "text-bone" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 ${
            inverted ? "text-bone/68" : "text-graphite/75"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}

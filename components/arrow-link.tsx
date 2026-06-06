type ArrowLinkProps = {
  href: string;
  label: string;
  variant?: "dark" | "light" | "line" | "lineDark";
};

export function ArrowLink({
  href,
  label,
  variant = "dark",
}: ArrowLinkProps) {
  const isExternal = href.startsWith("http");
  const styles = {
    dark: "bg-electric text-bone border-electric hover:bg-blue-700",
    light: "bg-bone text-ink border-ink/15 hover:border-electric",
    line: "border-ink/15 text-ink hover:border-electric hover:bg-electric/5",
    lineDark: "border-ink/15 text-ink hover:border-electric hover:bg-electric/5",
  };

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-md border px-6 text-sm font-medium transition duration-300 ${styles[variant]}`}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

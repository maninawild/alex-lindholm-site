import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section
      className="bg-bone py-16 text-ink sm:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <h2
            id="testimonials-heading"
            className="text-3xl font-medium leading-tight tracking-[-0.015em] text-balance sm:text-4xl"
          >
            What stayed with people
          </h2>
          <p className="mt-4 text-base leading-7 text-graphite/75">
            A few words people shared after talks, workshops, strategy sessions
            and founder conversations.
          </p>
        </header>

        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex min-w-0 flex-col border-t border-ink/12 pt-6"
            >
              <blockquote className="text-lg leading-8 text-graphite/82">
                “{testimonial.quote}”
              </blockquote>
              <footer className="mt-7">
                <p className="text-sm font-semibold text-ink">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm leading-6 text-graphite/62">
                  {testimonial.role}
                  {testimonial.age ? `, ${testimonial.age}` : ""}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

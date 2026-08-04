"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";

const desktopCardLayouts = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

function getMonogram(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const featured = testimonial.featured === true;

  return (
    <article
      aria-label={`${index + 1} of ${testimonials.length}: ${testimonial.name}`}
      aria-roledescription="slide"
      className={`flex w-[86%] shrink-0 snap-start snap-always flex-col justify-between rounded-sm border p-6 transition duration-300 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 lg:w-auto lg:snap-align-none lg:p-7 lg:hover:-translate-y-1 ${
        desktopCardLayouts[index] ?? "lg:col-span-4"
      } ${
        featured
          ? "min-h-[430px] border-ink bg-ink text-bone lg:min-h-full lg:p-9"
          : "min-h-[340px] border-ink/10 bg-[#f6f0e6] text-ink lg:min-h-[280px] lg:hover:border-electric/30"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <p
            className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
              featured ? "text-bone/62" : "text-electric"
            }`}
          >
            {testimonial.category}
          </p>
          <span
            className={`text-xs tabular-nums ${
              featured ? "text-bone/38" : "text-graphite/38"
            }`}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <blockquote
          className={`mt-8 tracking-[-0.012em] ${
            featured
              ? "text-2xl leading-[1.42] text-bone sm:text-[1.7rem] lg:mt-12"
              : "text-lg leading-8 text-graphite/82"
          }`}
        >
          {testimonial.quote}
        </blockquote>
      </div>

      <footer className="mt-10 flex items-start gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tracking-[0.08em] ${
            featured
              ? "border-bone/22 bg-bone/8 text-bone"
              : "border-ink/12 bg-bone text-ink"
          }`}
          aria-hidden="true"
        >
          {getMonogram(testimonial.name)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{testimonial.name}</p>
          <p
            className={`mt-1 text-sm leading-6 ${
              featured ? "text-bone/62" : "text-graphite/62"
            }`}
          >
            {testimonial.role}
            {testimonial.age ? `, ${testimonial.age}` : ""}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (requestedIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.max(
      0,
      Math.min(requestedIndex, testimonials.length - 1),
    );
    const firstCard = track.firstElementChild as HTMLElement | null;
    const nextCard = track.children.item(nextIndex) as HTMLElement | null;

    if (!firstCard || !nextCard) return;

    track.scrollTo({
      left: nextCard.offsetLeft - firstCard.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const targetLeft = track.scrollLeft + firstCard.offsetLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((card, index) => {
      const distance = Math.abs((card as HTMLElement).offsetLeft - targetLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === nearestIndex ? currentIndex : nearestIndex,
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(testimonials.length - 1);
    }
  };

  return (
    <section
      className="overflow-x-clip bg-bone py-20 text-ink sm:py-24 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-copper">
              Words from people
            </p>
            <h2
              id="testimonials-heading"
              className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl"
            >
              What stayed with people
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-graphite/72 lg:pb-1 lg:text-lg lg:leading-8">
            Selected feedback after talks, founder sessions, consultations and
            collaborations.
          </p>
        </header>

        <div
          ref={trackRef}
          role="region"
          aria-label="Testimonials carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="mt-12 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-3 outline-none scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-electric/45 focus-visible:ring-offset-4 focus-visible:ring-offset-bone [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:pb-0 lg:focus-visible:ring-0"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              testimonial={testimonial}
              index={index}
              key={testimonial.name}
            />
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-5 lg:hidden">
          <div className="flex items-center gap-2" aria-hidden="true">
            {testimonials.map((testimonial, index) => (
              <span
                key={testimonial.name}
                className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  activeIndex === index ? "w-8 bg-electric" : "w-3 bg-ink/15"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span
              className="min-w-12 text-center text-xs tabular-nums text-graphite/55"
              aria-live="polite"
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/14 text-lg text-ink transition hover:border-electric hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === testimonials.length - 1}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/14 text-lg text-ink transition hover:border-electric hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

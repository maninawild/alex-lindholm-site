"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";

const desktopCardLayouts = [
  "lg:col-span-6",
  "lg:col-span-6 lg:mt-10",
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-8",
  "lg:col-span-6",
  "lg:col-span-6 lg:mt-10",
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
  return (
    <article
      aria-label={`${testimonial.name} testimonial`}
      aria-roledescription="slide"
      tabIndex={-1}
      className={`flex w-[86%] shrink-0 snap-start snap-always flex-col justify-between rounded-sm border border-ink/10 bg-paper p-6 text-ink shadow-[0_18px_45px_rgba(16,19,26,0.045)] outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-electric/35 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 lg:w-auto lg:snap-none lg:p-8 lg:hover:-translate-y-0.5 lg:hover:border-electric/22 lg:hover:shadow-[0_22px_55px_rgba(16,19,26,0.07)] ${
        desktopCardLayouts[index] ?? "lg:col-span-6"
      }`}
    >
      <div>
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-7 bg-electric/45" aria-hidden="true" />
          <p className="text-[0.68rem] font-semibold uppercase text-electric">
            {testimonial.category}
          </p>
        </div>

        <blockquote className="text-[1.08rem] leading-8 text-graphite/86 sm:text-lg sm:leading-8">
          {testimonial.quote}
        </blockquote>
      </div>

      <footer className="mt-9 flex items-start gap-4 border-t border-ink/8 pt-6">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-[0.68rem] font-semibold text-ink/72"
          aria-hidden="true"
        >
          {getMonogram(testimonial.name)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="mt-1 text-sm leading-6 text-graphite/62">
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
    const nextCard = track.children.item(nextIndex) as HTMLElement | null;

    if (!nextCard) return;

    nextCard.focus({ preventScroll: false });
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
        <header className="grid gap-6 border-b border-ink/8 pb-10 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase text-electric">
              Words from people
            </p>
            <h2
              id="testimonials-heading"
              className="mt-4 text-4xl font-medium leading-[1.08] text-balance sm:text-5xl"
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
          className="mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-3 outline-none scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-electric/35 focus-visible:ring-offset-4 focus-visible:ring-offset-bone [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:pb-0 lg:focus-visible:ring-0"
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

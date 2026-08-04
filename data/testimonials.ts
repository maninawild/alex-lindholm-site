export type Testimonial = {
  name: string;
  role: string;
  age?: number;
  category: string;
  quote: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Alicja Rudawy",
    role: "Marketing Expert",
    age: 26,
    category: "Speaking",
    featured: true,
    quote:
      "It was really nice meeting you at the Build Night at Mollie. I really loved the talk we had about ADHD. Your presentation was really inspiring.",
  },
  {
    name: "Brian Winkel",
    role: "Founder & Advertising Specialist",
    category: "Speaking",
    quote:
      "Really enjoyed your talk at BuildNight. Thank you for your time!",
  },
  {
    name: "Robbin Jansen",
    role:
      "CPO-as-a-Service at Future Ready | Building Crelo & Rivilo | Unlocking Europe’s next generation of builders at DAY42",
    age: 25,
    category: "Speaking",
    quote:
      "Many thanks, Alex. It was nice to hear a story like yours from someone with an overflowing idea brain as well. Your 101 on building a start-up fits well with the stage most people in the room are in. We’ll keep pushing for sure. Just getting started.",
  },
  {
    name: "Alexander",
    role: "Founder",
    age: 40,
    category: "Founder Advisory",
    quote:
      "Alex showed me opportunities around me that I had never taken seriously. He also helped me work through failures and learn from them.",
  },
  {
    name: "Valery",
    role: "Founder",
    age: 31,
    category: "Partnerships & Relocation",
    quote:
      "Alex helped us find the right partners for our relocation and office setup in the Netherlands, saving us thousands of euros in unnecessary expenses.",
  },
  {
    name: "Pooja",
    role: "Managing Partner",
    age: 43,
    category: "Consulting",
    quote:
      "Thanks for the consultation. Our team wasn’t aware of these opportunities and shortcuts.",
  },
];

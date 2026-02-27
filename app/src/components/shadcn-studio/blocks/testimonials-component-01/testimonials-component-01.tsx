import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

export type TestimonialItem = {
  name: string;
  handle: string;
  avatar: string;
  content: string;
  verified?: boolean;
};

type TestimonialsComponentProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  columns: TestimonialItem[][];
};

/** Single testimonial card */
function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="size-12">
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback className="text-sm">
                {item.name
                  .split(" ", 2)
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="flex items-center gap-1 font-semibold">
                <span>{item.name}</span>
                {item.verified && (
                  <BadgeCheck className="size-4 fill-foreground stroke-card" />
                )}
              </h4>
              <p className="text-muted-foreground text-sm">{item.handle}</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.content}
        </p>
      </CardContent>
    </Card>
  );
}

/** Vertical marquee column */
function MarqueeColumn({
  items,
  duration,
  className,
}: {
  items: TestimonialItem[];
  duration: number;
  className?: string;
}) {
  return (
    <div
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": "1rem",
        } as React.CSSProperties
      }
      className={`group flex flex-col gap-[var(--marquee-gap)] overflow-hidden ${className ?? ""}`}
    >
      {/* We render the list 3x so the animation loops seamlessly */}
      {Array.from({ length: 3 }).map((_, copy) => (
        <div
          key={copy}
          className="flex shrink-0 flex-col justify-around gap-[var(--marquee-gap)] animate-marquee-vertical group-hover:[animation-play-state:paused]"
        >
          {items.map((item, i) => (
            <TestimonialCard key={`${copy}-${i}`} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

const TestimonialsComponent = ({
  title = "Testimonials",
  subtitle = "The Wall of",
  description = "Here's what advertisers say about scaling with GoAds.",
  columns,
}: TestimonialsComponentProps) => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container space-y-10 sm:space-y-14">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-medium underline underline-offset-6">
            {title}
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {subtitle}{" "}
            <span className="relative font-bold">
              Love
              <svg
                width="453"
                height="8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-0.5 left-0 h-2 w-full rotate-2"
              >
                <path
                  d="M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {description}
          </p>
        </div>

        {/* Marquee grid */}
        <div className="relative">
          {/* Top gradient fade */}
          <div className="from-background pointer-events-none absolute top-0 z-10 h-24 w-full bg-gradient-to-b to-transparent sm:h-32" />
          {/* Bottom gradient fade */}
          <div className="from-background pointer-events-none absolute bottom-0 z-10 h-24 w-full bg-gradient-to-t to-transparent sm:h-32" />

          <div className="grid h-[500px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:h-[600px]">
            {columns.map((col, i) => (
              <MarqueeColumn
                key={i}
                items={col}
                duration={30 + i * 4}
                className={`px-2 ${i === 1 ? "max-sm:hidden" : ""} ${i === 2 ? "max-lg:hidden" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsComponent;

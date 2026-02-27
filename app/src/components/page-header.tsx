import { cn } from "@/lib/utils";

export function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={className} {...props}>
      <div className="container flex flex-col items-center gap-2 px-0 py-8 text-center md:py-12 lg:py-16 xl:gap-4">
        {children}
      </div>
    </section>
  );
}

export function PageHeaderHeading({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn("font-semibold text-4xl lg:text-5xl", className)}
      {...props}
    />
  );
}

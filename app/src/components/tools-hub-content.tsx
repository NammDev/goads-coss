"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionPreset } from "@/components/ui/motion-preset";
import Logo from "@/assets/svg/logo";
import { TOOLS, getFeaturedTools, type ToolItem } from "@/data/tools-registry";

/* ---------- 3D spotlight + tilt effect (from BM page) ---------- */

function useCardEffects(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".tool-card");

    const handleMouseMove = (ev: MouseEvent) => {
      cards.forEach((card) => {
        const blob = card.querySelector<HTMLElement>(".blob");
        const fblob = card.querySelector<HTMLElement>(".fake-blob");
        if (!blob || !fblob) return;

        const rec = fblob.getBoundingClientRect();
        blob.style.opacity = "1";
        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          { duration: 300, fill: "forwards" }
        );
      });
    };

    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>(".card-inner");
      if (!inner) return;

      let rect: DOMRect;
      let animFrame: number | undefined;

      const animate = (mouseX: number, mouseY: number) => {
        if (!rect) rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = -(mouseY - cy) * 0.02;
        const ry = (mouseX - cx) * 0.02;
        inner.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1.015)`;
      };

      const onEnter = () => {
        inner.style.transition = "transform 0.2s ease-out";
        rect = card.getBoundingClientRect();
      };
      const onMove = (e: MouseEvent) => {
        if (animFrame) cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(() => animate(e.clientX, e.clientY));
      };
      const onLeave = () => {
        if (animFrame) cancelAnimationFrame(animFrame);
        inner.style.transform =
          "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
        inner.style.transition = "transform 0.4s ease-out";
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      (card as any).__cleanup3D = () => {
        if (animFrame) cancelAnimationFrame(animFrame);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cards.forEach((card) => {
        (card as any).__cleanup3D?.();
      });
    };
  }, [containerRef]);
}

/* ---------- BM-style tool card ---------- */

function ToolCardBM({ tool, index }: { tool: ToolItem; index: number }) {
  const Icon = tool.icon;
  return (
    <MotionPreset
      fade
      slide={{ direction: "up", offset: 20 }}
      blur="4px"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      delay={0.05 * index}
      inView
    >
      <Link href={`/tools/${tool.slug}`}>
        <div className="tool-card group/card relative cursor-pointer overflow-hidden rounded-xl bg-border p-px transition-all duration-200 ease-out">
          <div className="card-inner h-full">
            <Card className="h-full border-none transition-all duration-200 ease-out group-hover/card:bg-card/90 group-hover/card:backdrop-blur-[20px]">
              <CardContent className="flex h-full flex-col justify-between px-5 py-4">
                {/* top: icon + name left, price right */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold leading-tight">
                      {tool.title}
                    </h3>
                  </div>
                  <span className="shrink-0 text-lg font-bold text-primary">
                    Free
                  </span>
                </div>

                {/* description */}
                <p className="text-muted-foreground mt-2 text-xs">
                  {tool.description}
                </p>

                {/* spacer */}
                <div className="min-h-6" />

                {/* bottom: GoAds logo left, button right */}
                <div className="flex items-end justify-between">
                  <Logo className="size-6" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer gap-1.5"
                  >
                    Open Tool
                    <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:rotate-45" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="blob absolute top-0 left-0 size-20 rounded-full bg-foreground/20 opacity-0 blur-2xl transition-all duration-200 ease-out" />
          <div className="fake-blob absolute top-0 left-0 size-20 rounded-full" />
        </div>
      </Link>
    </MotionPreset>
  );
}

/* ---------- main export ---------- */

export function ToolsHubContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  useCardEffects(containerRef);

  const popularTools = getFeaturedTools();
  const allTools = TOOLS;

  return (
    <section id="tools" className="py-8 sm:py-16 lg:py-24" ref={containerRef}>
      <div className="container space-y-12 sm:space-y-16">
        {/* Popular Tools */}
        <div className="space-y-6">
          <MotionPreset
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.4 }}
            inView
          >
            <h2 className="text-xl font-semibold">Popular Tools</h2>
          </MotionPreset>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool, i) => (
              <ToolCardBM key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* All Tools */}
        <div className="space-y-6">
          <MotionPreset
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.4 }}
            inView
          >
            <h2 className="text-xl font-semibold">All Tools</h2>
          </MotionPreset>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allTools.map((tool, i) => (
              <ToolCardBM key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

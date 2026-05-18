// Overlapping circular avatars. [SRC] .intercom-7itejd (container) +
// .intercom-9n6tdo (each = 40px circle). Overlap + white ring are [DERIVED]
// from the screenshots (avatar-stack-item wrapper CSS not provided).

interface Avatar {
  alt: string
  src?: string
}

export function SupportWidgetAvatarStack({ avatars }: { avatars: readonly Avatar[] }) {
  return (
    // [SRC] .intercom-7itejd: flex; flex 0 0 auto; items-center;
    // margin-right 6px; white-space nowrap; width fit-content; overflow hidden;
    // line-height 1
    <div className="flex w-fit shrink-0 grow-0 basis-auto items-center mr-1.5 overflow-hidden whitespace-nowrap leading-none">
      {avatars.map((a, i) => (
        // [SRC] .intercom-9n6tdo: 40x40; border-radius 50%; inline-block;
        // align-middle; cursor default; overflow hidden.
        // [DERIVED] overlap -10px + 2px white ring (from screenshot).
        <div
          key={i}
          className="relative inline-block size-10 cursor-default overflow-hidden rounded-full align-middle ring-2 ring-white"
          style={{ marginLeft: i === 0 ? 0 : -10 }}
        >
          {a.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.src} alt={a.alt} className="size-full object-cover" />
          ) : (
            <div
              className="flex size-full items-center justify-center bg-white/30 text-[20px] font-semibold text-white"
              aria-label={a.alt}
            >
              {a.alt.slice(0, 1)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

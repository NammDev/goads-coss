// Help landing search — minimal adaptation of docs-landing-search.tsx.
// Same markup/classNames verbatim. Dispatches Cmd+K to open the global CommandMenu.
// Not coupled to docs data — searching helpTabs is handled by the CommandMenu globally.

"use client"

export function HelpLandingSearch() {
  const dispatchCmdK = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true }),
    )
  }

  return (
    <form
      action=""
      role="search"
      className="relative mx-auto mt-10 w-full max-w-3xl"
      onClick={dispatchCmdK}
    >
      <div
        className="relative grid w-full rounded-[12px]"
        style={
          {
            "--border-width": "1px",
            "--border-radius": "12px",
            "--border-radius-child": "calc(12px - 1px)",
            "--shine-pulse-duration": "14s",
            "--mask-linear-gradient":
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "--background-radial-gradient":
              "radial-gradient(hsl(var(--secondary)), transparent, hsl(var(--accent)), transparent, transparent)",
          } as React.CSSProperties
        }
      >
        {/* Animated shine border (1px) — radial-gradient masked to ring only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 aspect-square h-full w-full rounded-[var(--border-radius)] p-[var(--border-width)] opacity-30 blur-lg [background-image:var(--background-radial-gradient)] [background-size:300%_300%] [mask:var(--mask-linear-gradient)] [mask-composite:exclude] [-webkit-mask-composite:xor] motion-safe:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear] will-change-[background-position]"
        />

        {/* Content layer */}
        <div className="z-[1] h-full w-full rounded-[var(--border-radius-child)]">
          <div className="relative !rounded-lg border border-foreground/[10%] bg-foreground/[4.5%]">
            <textarea
              id="help_search"
              rows={1}
              placeholder="Search for articles"
              readOnly
              onClick={dispatchCmdK}
              onFocus={dispatchCmdK}
              data-gramm="false"
              className="custom-scrollbar-stronger relative max-h-[200px] w-full cursor-pointer resize-none rounded-lg border-none bg-transparent p-4 !pr-16 text-lg font-normal break-words whitespace-pre-wrap text-white shadow-xl shadow-gray-200/20 ring-0 backdrop-blur-sm placeholder:text-gray-300/60 focus:ring-0 focus:outline-none"
              style={{ height: "60px" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-4 my-auto h-6 w-5 text-foreground/30 sm:h-7 sm:w-7"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </form>
  )
}

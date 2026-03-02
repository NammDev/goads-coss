const COLS = 27
const ROWS = 8
const CELL_SIZE = 56.815
const TOTAL = COLS * ROWS

export default function HeroGridBg() {
  return (
    <div className="absolute inset-0 h-full w-full [--cell-border-color:color-mix(in_oklab,var(--accent),black_10%)] [--cell-fill-color:var(--accent)] [--cell-shadow-color:color-mix(in_oklab,var(--accent),black_43%)] dark:[--cell-border-color:color-mix(in_oklab,var(--accent),white_14%)] dark:[--cell-fill-color:color-mix(in_oklab,var(--accent),black_22%)] dark:[--cell-shadow-color:var(--accent)]">
      <div className="relative flex h-auto w-auto justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <div
          className="relative z-[3]"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
            width: `${COLS * CELL_SIZE}px`,
            height: `${ROWS * CELL_SIZE}px`,
            marginInline: 'auto',
            maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
          }}
        >
          {Array.from({ length: TOTAL }, (_, i) => (
            <div
              key={i}
              className="cell relative border-[0.5px] opacity-40 transition-all duration-150 will-change-transform hover:opacity-60 hover:brightness-95 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset] dark:hover:opacity-90"
              style={{
                backgroundColor: 'var(--cell-fill-color)',
                borderColor: 'var(--cell-border-color)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

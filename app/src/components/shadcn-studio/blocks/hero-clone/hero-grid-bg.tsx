'use client'

import { useCallback, useEffect, useRef } from 'react'

const COLS = 25
const ROWS = 8
const CELL_SIZE = 56.815
const TOTAL = COLS * ROWS

const DEFAULT_VARS = '[--cell-border-color:color-mix(in_oklab,var(--accent),black_10%)] [--cell-fill-color:var(--accent)] [--cell-shadow-color:color-mix(in_oklab,var(--accent),black_43%)] dark:[--cell-border-color:color-mix(in_oklab,var(--accent),white_14%)] dark:[--cell-fill-color:color-mix(in_oklab,var(--accent),black_22%)] dark:[--cell-shadow-color:var(--accent)]'

export default function HeroGridBg({ className }: { className?: string } = {}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const triggerRipple = useCallback((clientX: number, clientY: number) => {
    const grid = gridRef.current
    if (!grid) return
    const rect = grid.getBoundingClientRect()
    const clickCol = (clientX - rect.left) / CELL_SIZE
    const clickRow = (clientY - rect.top) / CELL_SIZE
    const cells = grid.children

    const maxRadius = 10
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dist = Math.sqrt((r - clickRow) ** 2 + (c - clickCol) ** 2)
        if (dist > maxRadius) continue
        const cell = cells[r * COLS + c] as HTMLElement | undefined
        if (!cell) continue

        const delay = Math.round(dist * 50)
        setTimeout(() => {
          cell.style.transition = 'opacity 0.1s ease-out'
          cell.style.opacity = '0.8'
          setTimeout(() => {
            cell.style.transition = 'opacity 0.15s ease-out'
            cell.style.opacity = '0.55'
            setTimeout(() => {
              cell.style.transition = 'opacity 1s ease-in'
              cell.style.opacity = ''
            }, 150)
          }, 100)
        }, delay)
      }
    }
  }, [])

  /* Listen to clicks on the closest parent section so ripple works even through z-10 content */
  useEffect(() => {
    const wrapper = wrapperRef.current
    const section = wrapper?.closest('section')
    if (!section) return
    const handler = (e: MouseEvent) => triggerRipple(e.clientX, e.clientY)
    section.addEventListener('click', handler)
    return () => section.removeEventListener('click', handler)
  }, [triggerRipple])

  return (
    <div ref={wrapperRef} className={`pointer-events-none absolute inset-0 h-full w-full ${DEFAULT_VARS} ${className ?? ''}`}>
      <div className="relative flex h-auto w-auto justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <div
          ref={gridRef}
          className="relative z-[3]"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
            width: `${COLS * CELL_SIZE}px`,
            height: `${ROWS * CELL_SIZE}px`,
            marginInline: 'auto',
            maskImage: 'radial-gradient(ellipse at top, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 40%, transparent 80%)',
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

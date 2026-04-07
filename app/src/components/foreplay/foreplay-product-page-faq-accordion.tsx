// Foreplay FAQ accordion — .faq (expandable Q&A with smooth height animation)
// .faq-block: flex row, gap-[44px], border-bottom 1px solid neutral-700 (#ffffff1a = white 10%),
//   color neutral-100 (#ffffffad), pt-5 pb-3, cursor-pointer, transition 0.9s cubic-bezier(.19,1,.22,1)
// .faq-block:hover: color neutral-0 (#fff)
// .faq-block_content: flex col, flex-1
// .faq-block_head: flex, items-center
// .faq-block_body: height:0 → scrollHeight, overflow:hidden, transition 0.9s
// .faq-block_answer: py-2, opacity 1
// .faq-block_icon: 28x28, flex center. .icon-24: 24x24, flex center. SVG 100%x100%
// [data-expanded="true"] .chevron-icon: rotate(180deg)
// [data-expanded="true"] .faq-block_head: color white

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { cn } from "@/lib/utils"

interface FaqItem { question: string; answer: string }

interface ForeplayProductPageFaqAccordionProps {
  subtitle?: string
  title: string
  description?: string
  items: FaqItem[]
}

export function ForeplayProductPageFaqAccordion({
  subtitle = "FAQ", title, description, items,
}: ForeplayProductPageFaqAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const toggle = (i: number) => setExpandedIndex(prev => (prev === i ? null : i))

  return (
    <div className="flex flex-col gap-12 py-[140px] max-md:gap-10 max-md:py-20 max-sm:py-16">
      <ForeplaySectionHead
        subtitle={subtitle} title={title} titleTag="h3" titleSize="h2"
        description={description} descSize="l" variant="light"
      />
      {/* .faq-block-container: w-full, max-w-[752px], mx-auto */}
      <div className="mx-auto w-full max-w-[752px]">
        {items.map((item, i) => (
          <FaqBlock key={i} item={item} isExpanded={expandedIndex === i} onToggle={() => toggle(i)} />
        ))}
      </div>

      {/* .faq-buttons: flex, gap-3, center, py-3 — sibling of .faq-block-container */}
      <div className="flex items-center justify-center gap-3 py-3 max-sm:flex-col max-sm:items-stretch">
          <a href="#" className="flex items-center gap-[5px] rounded-[10px] bg-background p-2 text-foreground no-underline transition-all duration-200 hover:bg-[var(--fp-alpha-700)] focus:shadow-[0_0_0_2px_var(--background),0_0_0_3px_white] focus:outline-none">
            {/* .button-icon-block.icon-left */}
            <span className="relative z-[2] -mr-1 flex items-center justify-center opacity-[0.68]">
              <span className="flex size-6 items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.68">
                    <path d="M5.5 8.5H6.25C6.25 8.08579 5.91421 7.75 5.5 7.75V8.5ZM5.5 13.375V14.125C5.91421 14.125 6.25 13.7892 6.25 13.375H5.5ZM14.875 8.5V7.75C14.4608 7.75 14.125 8.08579 14.125 8.5H14.875ZM14.875 13.375H14.125C14.125 13.7892 14.4608 14.125 14.875 14.125V13.375ZM10.75 15.25C10.75 14.8358 10.4142 14.5 10 14.5C9.58577 14.5 9.25 14.8358 9.25 15.25H10.75ZM16.5625 13.375C16.5625 12.9608 16.2267 12.625 15.8125 12.625C15.3983 12.625 15.0625 12.9608 15.0625 13.375H16.5625ZM4.375 9.25H5.5V7.75H4.375V9.25ZM4.75 8.5V13.375H6.25V8.5H4.75ZM5.5 12.625H4.375V14.125H5.5V12.625ZM4 12.25V9.625H2.5V12.25H4ZM4.375 12.625C4.16789 12.625 4 12.4571 4 12.25H2.5C2.5 13.2855 3.33947 14.125 4.375 14.125V12.625ZM4.375 7.75C3.33947 7.75 2.5 8.58948 2.5 9.625H4C4 9.41792 4.16789 9.25 4.375 9.25V7.75ZM14.875 9.25H16V7.75H14.875V9.25ZM16.375 9.625V12.25H17.875V9.625H16.375ZM16 12.625H14.875V14.125H16V12.625ZM15.625 13.375V8.5H14.125V13.375H15.625ZM16.375 12.25C16.375 12.4571 16.2071 12.625 16 12.625V14.125C17.0355 14.125 17.875 13.2855 17.875 12.25H16.375ZM16 9.25C16.2071 9.25 16.375 9.41792 16.375 9.625H17.875C17.875 8.58948 17.0355 7.75 16 7.75V9.25ZM5.5 8.3125C5.5 5.98035 7.54729 4 10.1875 4V2.5C6.82161 2.5 4 5.05277 4 8.3125H5.5ZM10.1875 4C12.8277 4 14.875 5.98035 14.875 8.3125H16.375C16.375 5.05277 13.5534 2.5 10.1875 2.5V4ZM4 8.3125V8.5H5.5V8.3125H4ZM14.875 8.3125V8.5H16.375V8.3125H14.875ZM12.4375 16H11.125V17.5H12.4375V16ZM10.75 15.625V15.25H9.25V15.625H10.75ZM15.0625 13.375C15.0625 14.8247 13.8872 16 12.4375 16V17.5C14.7157 17.5 16.5625 15.6532 16.5625 13.375H15.0625ZM11.125 16C10.9179 16 10.75 15.8321 10.75 15.625H9.25C9.25 16.6605 10.0895 17.5 11.125 17.5V16Z" fill="white" />
                  </g>
                </svg>
              </span>
            </span>
            <span className="relative z-[2] px-1.5 font-sans text-base font-[550] leading-6 tracking-[-0.01125em]">Contact support</span>
          </a>
          <a href="#" target="_blank" className="flex items-center gap-[5px] rounded-[10px] bg-background p-2 text-foreground no-underline transition-all duration-200 hover:bg-[var(--fp-alpha-700)] focus:shadow-[0_0_0_2px_var(--background),0_0_0_3px_white] focus:outline-none">
            <span className="relative z-[2] -mr-1 flex items-center justify-center opacity-[0.68]">
              <span className="flex size-6 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.68">
                    <path d="M12 7.04982L6.0905 5.73659C4.96637 5.48678 3.90002 6.34217 3.90002 7.49372V16.4059C3.90002 17.2495 4.48598 17.98 5.30955 18.163L12 19.6498M12 7.04982L17.9095 5.73659C19.0337 5.48678 20.1 6.34217 20.1 7.49372V16.4059C20.1 17.2495 19.514 17.98 18.6905 18.163L12 19.6498M12 7.04982V19.6498" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </span>
            </span>
            <span className="relative z-[2] px-1.5 font-sans text-base font-[550] leading-6 tracking-[-0.01125em]">Knowledge Base</span>
          </a>
        </div>
    </div>
  )
}

function FaqBlock({ item, isExpanded, onToggle }: { item: FaqItem; isExpanded: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  // Measure content height for smooth animation
  const measureHeight = useCallback(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight)
  }, [])

  useEffect(() => {
    measureHeight()
    // Re-measure on resize
    window.addEventListener("resize", measureHeight)
    return () => window.removeEventListener("resize", measureHeight)
  }, [measureHeight])

  return (
    <button
      type="button"
      tabIndex={0}
      data-expanded={isExpanded}
      aria-expanded={isExpanded}
      onClick={onToggle}
      className={cn(
        // .faq-block: flex row, gap-[44px], border-b 1px neutral-700 (#ffffff1a)
        "flex w-full cursor-pointer flex-row items-start gap-[44px]",
        "border-b border-[#ffffff1a]",
        "pt-5 pb-3",
        "text-[var(--fp-alpha-100)]",
        "transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
        "hover:text-foreground",
      )}
    >
      {/* .faq-block_content: flex col, flex-1 */}
      <div className="flex flex-1 flex-col">
        {/* .faq-block_head */}
        <div className="flex items-center">
          <h4 className={cn(
            "m-0 font-sans text-[1.125rem] font-medium tracking-[-0.0144em] max-sm:text-base",
            "transition-colors duration-[900ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
            isExpanded && "text-foreground",
          )}>
            {item.question}
          </h4>
        </div>

        {/* .faq-block_body: height animated, overflow hidden */}
        <div
          ref={bodyRef}
          className="overflow-hidden transition-[height] duration-[900ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
          style={{ height: isExpanded ? `${height}px` : "0px" }}
        >
          {/* .faq-block_answer > .faq-rtb > .text-alpha-100 > .text-body-s */}
          <div className="overflow-hidden py-2">
            <div className="text-[var(--fp-alpha-100)]">
              <p className={fpText.bodyS}>{item.answer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* .faq-block_icon: 28x28 flex center */}
      <div className="flex size-7 shrink-0 items-center justify-center transition-all duration-200">
        {/* .icon-24: 24x24 flex center > svg 100%x100% */}
        <div className="flex size-6 items-center justify-center">
          <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="none" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor"
              d="M13 8.5L10.5303 10.9697C10.2374 11.2626 9.76255 11.2626 9.46968 10.9697L7 8.5"
              className={cn(
                "origin-center transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
                isExpanded && "rotate-180",
              )}
            />
          </svg>
        </div>
      </div>
    </button>
  )
}

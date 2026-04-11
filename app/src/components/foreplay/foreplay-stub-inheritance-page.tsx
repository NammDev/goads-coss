// Foreplay stub inheritance page — placeholder layout cloning /foreplay/page/privacy-policy
// Used for marketing routes that haven't been refactored yet. Renders hero + white block
// containing a short note about which existing Foreplay route this page will inherit UI from.
//
// Usage:
//   <ForeplayStubInheritancePage
//     title="Business Managers"
//     inheritsFrom="/foreplay/profiles"   // or undefined if no match → "need to find UI"
//     note="Optional extra note"
//   />

import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplaySectionWhiteBlock } from "@/components/foreplay/foreplay-section-white-block"

interface ForeplayStubInheritancePageProps {
  title: string
  inheritsFrom?: string // Foreplay route path to inherit UI from (e.g. "/foreplay/profiles")
  note?: string // Optional additional note
}

export function ForeplayStubInheritancePage({
  title,
  inheritsFrom,
  note,
}: ForeplayStubInheritancePageProps) {
  const headingText = inheritsFrom ? "UI Reference" : "Chưa có UI Reference"
  const inheritMessage = inheritsFrom
    ? `Trang này sẽ kế thừa UI từ <strong>${inheritsFrom}</strong>.`
    : `Trang này <strong>chưa có Foreplay counterpart</strong> — cần đi tìm UI từ Foreplay.co hoặc design riêng.`

  return (
    <>
      {/* .section.overflow-hidden — hero wrapper (same as privacy-policy) */}
      <section className="overflow-hidden">
        <ForeplaySectionContainer variant="section">
          {/* .pages-title — py-[75px] flex-col */}
          <div className="flex flex-col py-[75px]">
            {/* Reuse ForeplaySectionHead atom (variant="light" → white text on dark bg) */}
            <ForeplaySectionHead
              title={title}
              titleTag="h1"
              titleSize="h2"
              variant="light"
            />
          </div>
        </ForeplaySectionContainer>
      </section>

      {/* .section-white-block — bg white, rounded-[36px] */}
      <ForeplaySectionWhiteBlock>
        <ForeplaySectionContainer variant="wide">
          <div className="py-[25px]" />
          {/* .blog-rtb — source typography: 16px/24px letter-spacing:-0.18px */}
          <div className="text-base leading-6 tracking-[-0.18px] text-[var(--fp-alpha-50)]">
            {/* .text-solid-700 — restore dark color for white bg */}
            <div className="text-[var(--fp-solid-700)]">
              {/* Stub content — inheritance note */}
              <div className="prose prose-neutral max-w-none font-sans [&_h3]:mt-4 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:leading-8 [&_p]:my-4 [&_p]:text-base [&_p]:leading-6">
                <h3>{headingText}</h3>
                <p dangerouslySetInnerHTML={{ __html: inheritMessage }} />
                {note && <p>{note}</p>}
                <p className="italic opacity-70">
                  Route: <code className="rounded bg-[var(--fp-solid-100)] px-1.5 py-0.5 text-sm">{title}</code>
                </p>
              </div>
            </div>
          </div>
          <div className="py-[25px]" />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>
    </>
  )
}

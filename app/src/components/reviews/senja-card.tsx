// Senja review card — cloned from Senja.io widget masonry card
// Layout: avatar(42px) + name + platform-icon | stars(5x20px) | content(line-clamp-10) | date(opacity-0.7)
// Card: p-4, border 1px border-[hsl(0,0%,90%)], rounded-xl, bg-white, text-[#374151], font-sans

import { cn } from "@/lib/utils"

export interface SenjaReviewCardProps {
  name: string
  avatarUrl?: string
  rating?: number // 1-5
  content: string
  date: string
  platformIcon?: React.ReactNode
  className?: string
}

export function SenjaReviewCard({
  name,
  avatarUrl,
  rating = 5,
  content,
  date,
  platformIcon,
  className,
}: SenjaReviewCardProps) {
  // Generate initials from name for fallback avatar
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2 rounded-xl border border-[hsl(0,0%,90%)] bg-white p-4 text-left font-sans text-base text-[#374151]",
        className,
      )}
    >
      {/* Endorser row: avatar + name + spacer + platform icon */}
      <div className="flex items-center gap-2">
        {/* Avatar — 42px circle */}
        <div className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-black text-xs font-medium text-[#757575]">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="size-full rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        {/* Name */}
        <div className="min-w-0 flex-1 truncate font-semibold text-[#374151]">
          {name}
        </div>
        {/* Platform icon */}
        {platformIcon && (
          <div className="shrink-0">{platformIcon}</div>
        )}
      </div>

      {/* Star rating — 20px stars, color #FBBF24 */}
      <div className="my-1 flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < rating} />
        ))}
      </div>

      {/* Review content — line-clamp 10, exact Senja -webkit-box approach */}
      <div className="text-left text-[#374151]">
        <div
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 10,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </div>
      </div>

      {/* Date — opacity 0.7, pushed to bottom */}
      <div className="mt-auto pt-2 text-xs opacity-70">
        {date}
      </div>
    </div>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 -10 187.673 179.503"
      className="shrink-0"
    >
      <path
        fill={filled ? "#FBBF24" : "#e5e7eb"}
        d="M187.183 57.47a9.955 9.955 0 00-8.587-6.86l-54.167-4.918-21.42-50.134a9.978 9.978 0 00-9.172-6.052 9.972 9.972 0 00-9.172 6.061l-21.42 50.125L9.07 50.611a9.973 9.973 0 00-8.578 6.858 9.964 9.964 0 002.917 10.596l40.944 35.908-12.073 53.184a9.97 9.97 0 003.878 10.298A9.953 9.953 0 0042 169.357a9.937 9.937 0 005.114-1.424l46.724-27.925 46.707 27.925a9.936 9.936 0 0010.964-.478 9.979 9.979 0 003.88-10.298l-12.074-53.184 40.944-35.9a9.98 9.98 0 002.925-10.604z"
      />
    </svg>
  )
}

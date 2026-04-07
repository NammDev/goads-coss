// Foreplay demo social proof — .demo-socialproof
// DOM: .demo-socialproof > .demo-socailproof-head-copy (grid 2 cols) > .section-head.is-align-left + .demo-socialproof-icons
// .demo-socialproof: flex col, gap-16 (64px), py-16 (64px)
// .demo-socailproof-head-copy: grid 2 cols (1fr 1fr), gap-4 (16px)
// .section-head.is-align-left: text-left, items-start
// .demo-socialproof-icons: grid 3 cols, gap-2 (8px)
// .demo-socialproof-item: inset border solid-50, rounded-xl, p-1, flex col, min-w-[144px]
// .demo-socialproof-content: flex col, gap-0, items-center, pt-1 pb-2
// .dev-socialproof-rating: flex, gap-0.5, items-center, text-solid-600, text-[1.2rem]
// .demo-socialproof-item-name: bg solid-25, text solid-900, text-center, rounded-lg, py-1.5 px-2

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

/* Star icon — exact source: fill #4C505F, 20x20 */
function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.829 2.60732C9.89763 2.46423 10.1024 2.46423 10.171 2.60732L12.1827 6.80102C12.2103 6.85861 12.2654 6.89838 12.329 6.90672L16.9601 7.51399C17.1181 7.53471 17.1813 7.72842 17.0658 7.83758L13.6779 11.0367C13.6314 11.0806 13.6103 11.145 13.6221 11.2077L14.4726 15.7767C14.5016 15.9327 14.336 16.0524 14.1959 15.9768L10.0904 13.7602C10.0341 13.7298 9.96595 13.7298 9.90963 13.7602L5.80414 15.9768C5.66406 16.0524 5.49841 15.9327 5.52744 15.7767L6.37794 11.2077C6.38961 11.145 6.36859 11.0806 6.32208 11.0367L2.93425 7.83758C2.81865 7.72842 2.88193 7.53471 3.03994 7.51399L7.67106 6.90672C7.73465 6.89838 7.78968 6.85861 7.81731 6.80102L9.829 2.60732Z" fill="#4C505F" stroke="#4C505F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const socialProofItems = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#F9F9FA" />
        <rect x="10" y="10" width="20" height="20" rx="10" fill="#FF492C" />
        <path d="M22.047 22.184C22.425 22.841 22.799 23.489 23.172 24.138C21.518 25.404 18.943 25.558 17.037 24.099C14.844 22.418 14.484 19.552 15.658 17.488C17.008 15.114 19.536 14.589 21.163 14.974C21.119 15.07 20.144 17.092 20.144 17.092C20.144 17.092 20.067 17.097 20.024 17.097C19.543 17.118 19.184 17.23 18.801 17.428C18.379 17.648 18.018 17.968 17.749 18.359C17.48 18.751 17.311 19.202 17.256 19.674C17.2 20.153 17.266 20.638 17.449 21.084C17.603 21.461 17.822 21.796 18.115 22.079C18.565 22.513 19.101 22.782 19.721 22.871C20.309 22.955 20.874 22.872 21.404 22.606C21.602 22.506 21.771 22.396 21.969 22.245C21.994 22.229 22.016 22.208 22.047 22.184Z" fill="white" />
        <path d="M22.051 16.429C21.955 16.334 21.866 16.247 21.777 16.159C21.724 16.107 21.673 16.053 21.619 16.002C21.6 15.983 21.577 15.958 21.577 15.958C21.577 15.958 21.595 15.919 21.603 15.903C21.707 15.695 21.869 15.543 22.062 15.422C22.275 15.287 22.523 15.219 22.775 15.225C23.097 15.231 23.397 15.312 23.65 15.528C23.837 15.688 23.932 15.89 23.949 16.132C23.977 16.539 23.809 16.852 23.474 17.07C23.277 17.198 23.065 17.297 22.852 17.414C22.734 17.479 22.634 17.536 22.519 17.653C22.418 17.771 22.413 17.882 22.413 17.882L23.938 17.88V18.559H21.584C21.584 18.559 21.584 18.513 21.584 18.493C21.575 18.16 21.614 17.846 21.767 17.542C21.908 17.264 22.126 17.061 22.389 16.904C22.591 16.783 22.804 16.681 23.006 16.56C23.131 16.486 23.22 16.378 23.219 16.22C23.219 16.085 23.12 15.964 22.98 15.927C22.648 15.838 22.311 15.98 22.136 16.284C22.11 16.328 22.084 16.372 22.051 16.429Z" fill="white" />
        <path d="M25 21.462L23.715 19.243H21.172L19.879 21.485H22.441L23.705 23.694L25 21.462Z" fill="white" />
      </svg>
    ),
    rating: "4.9/5",
    label: "G2 REVIEWS",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#F9F9FA" />
        <path d="M20 25.564C23.073 25.564 25.564 23.073 25.564 20C25.564 16.927 23.073 14.436 20 14.436C16.927 14.436 14.436 16.927 14.436 20C14.436 23.073 16.927 25.564 20 25.564Z" fill="white" />
        <path d="M12.804 17.266C12.389 16.547 11.901 15.792 11.34 15.002C10.462 16.522 10 18.246 10 20.002C10 21.757 10.462 23.482 11.34 25.002C12.218 26.522 13.48 27.784 15.001 28.662C16.521 29.539 18.246 30.001 20.001 30C20.921 28.71 21.546 27.779 21.876 27.208C22.508 26.112 23.327 24.543 24.331 22.501V22.5C23.892 23.261 23.261 23.892 22.501 24.331C20.954 25.225 19.047 25.225 17.5 24.332C16.74 23.893 16.109 23.262 15.67 22.501C14.306 19.958 13.351 18.213 12.804 17.266Z" fill="#229342" />
        <path d="M20.001 30C21.756 30 23.481 29.538 25.001 28.66C26.521 27.783 27.783 26.52 28.661 25C29.539 23.48 30 21.755 30 20C30 18.244 29.537 16.52 28.659 15C26.765 14.813 25.367 14.72 24.465 14.72C23.443 14.72 21.954 14.813 20 15L19.999 15.001C20.877 15 21.739 15.231 22.5 15.67C23.26 16.108 23.891 16.739 24.33 17.5C25.224 19.047 25.224 20.953 24.33 22.5L20.001 30Z" fill="#FBC116" />
        <path d="M20 23.959C22.187 23.959 23.959 22.187 23.959 20C23.959 17.814 22.187 16.042 20 16.042C17.814 16.042 16.042 17.814 16.042 20C16.042 22.187 17.814 23.959 20 23.959Z" fill="#1A73E8" />
        <path d="M20 15H28.66C27.782 13.48 26.52 12.217 25 11.34C23.479 10.462 21.755 10 20 10C18.244 10 16.52 10.462 15 11.34C13.48 12.218 12.218 13.481 11.34 15.002L15.67 22.501L15.671 22.501C14.777 20.954 14.777 19.048 15.67 17.501C16.108 16.74 16.74 16.109 17.5 15.67C18.26 15.231 19.123 15 20.001 15H20Z" fill="#E33B2E" />
      </svg>
    ),
    rating: "4.8/5",
    label: "CHROME",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#F9F9FA" />
        <path d="M7.779 18.92L16.226 18.922L21.363 18.923V13.834L7.779 18.92Z" fill="#FF9D28" />
        <path d="M21.363 13.834V31.8L27.778 11.431L21.363 13.834Z" fill="#68C5ED" />
        <path d="M21.363 18.923L16.226 18.922L21.363 31.8V18.923Z" fill="#044D80" />
        <path d="M7.779 18.92L17.543 22.226L16.226 18.922L7.779 18.92Z" fill="#E54747" />
      </svg>
    ),
    rating: "4.8/5",
    label: "CAPTERRA",
  },
]

export function ForeplayDemoSocialProof() {
  return (
    <div className="flex flex-col py-20">
      {/* .demo-socailproof-head-copy: grid 2 cols, gap-4 */}
      <div className="grid grid-cols-[1fr_1fr] items-stretch gap-4">
        {/* .section-head.is-align-left */}
        <div className="flex flex-col items-start gap-2 text-left">
          <div className="[text-wrap:balance]">
            <h2 className={cn(fpText.displayH3, "text-[var(--fp-solid-700)]")}>
              Loved by brands and agencies globally.
            </h2>
          </div>
          <div className="[text-wrap:balance]">
            <div className="text-[var(--fp-solid-600)]">
              <p className={fpText.bodyL}>
                Don't just take our word for it, read our reviews or checkout the wall of love.
              </p>
            </div>
          </div>
        </div>

        {/* .demo-socialproof-icons: grid 3 cols, gap-2, items stretch to fill height */}
        <div className="grid auto-cols-fr grid-cols-3 items-stretch gap-2">
          {socialProofItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                // .demo-socialproof-item
                "flex min-w-[144px] flex-col items-stretch rounded-xl p-1",
                "shadow-[inset_0_0_0_1px_var(--fp-solid-50)]",
              )}
            >
              {/* .demo-socialproof-content */}
              <div className="flex flex-1 flex-col items-center justify-center gap-0 pt-1 pb-2">
                <div className="size-10">{item.icon}</div>
                {/* .dev-socialproof-rating */}
                <div className="flex items-center gap-0.5 text-[1.2rem] text-[var(--fp-solid-600)]">
                  <StarIcon />
                  <div className="font-semibold">{item.rating}</div>
                </div>
              </div>
              {/* .demo-socialproof-item-name */}
              <div className="rounded-lg bg-[var(--fp-solid-25)] px-2 py-1.5 text-center text-[var(--fp-solid-900)]">
                <div className={fpText.overline}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// GoAds customer reviews — displayed on /reviews (Wall of Love) page
// Replace/extend with real reviews as they come in

export interface ReviewData {
  name: string
  avatarUrl?: string
  rating: number
  content: string
  date: string
  platform?: "chrome_web_store" | "google" | "telegram" | "facebook"
}

export const goadsReviews: ReviewData[] = [
  {
    name: "Patrick Self",
    rating: 5,
    content: "Great option for ads",
    date: "Apr 7, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Jordan McKenzie",
    rating: 5,
    content: "I own an agency, switched to Foreplay from using Atria before. It's infinitely better. Love this app and the extension is incredible.",
    date: "Apr 5, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Rachel Simmons",
    rating: 5,
    content: "Foreplay has been an absolute game changer in getting all my ad inspiration in one place. The ability to create different boards is so useful and easy to come back to for creative testing!",
    date: "Apr 3, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Daniel Hartley",
    rating: 5,
    content: "I've used Foreplay at my previous agency and now that I'm running my own performance marketing agency, it has been a must have. The data is significantly better than Gethookd, which alone justifies the higher price point. I even calculated the time saved when briefing designers. If I had to manually find ads through the Meta Ad Library, it would add roughly 5 extra hours to my workload every single day.",
    date: "Apr 1, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Pierre Dumont",
    rating: 5,
    content: "Une super solution ! je l'adore !",
    date: "Mar 28, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Megan Torres",
    rating: 5,
    content: "I have used Foreplay before and we are actively using it on a daily basis for creative inspiration and find new angles/hooks for our brands.",
    date: "Mar 25, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Carlos Reyes",
    rating: 5,
    content: "Excelente APP para investigación creativa.",
    date: "Mar 22, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Lucas Martin",
    rating: 5,
    content: "Top !",
    date: "Mar 20, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Ethan Brooks",
    rating: 5,
    content: "Great, essential to scale your DTC brand",
    date: "Mar 18, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Sophia Grant",
    rating: 5,
    content: "Great Tool. Saves tons of time and energy in the ad creative process. Worth every penny!",
    date: "Mar 15, 2026",
    platform: "chrome_web_store",
  },
  // --- Batch 2 ---
  {
    name: "Alex Turner",
    rating: 5,
    content: "Switched from another provider and GoAds has been night and day. Accounts are stable, support is fast, pricing is fair.",
    date: "Mar 12, 2026",
    platform: "google",
  },
  {
    name: "Minh Nguyen",
    rating: 5,
    content: "Agency accounts chạy rất ổn. Team support phản hồi nhanh, thay thế ngay khi có vấn đề.",
    date: "Mar 10, 2026",
    platform: "telegram",
  },
  {
    name: "Jessica Lane",
    rating: 5,
    content: "The extension is a lifesaver. BM invites and cookie login in one click. Can't go back to doing it manually.",
    date: "Mar 8, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Ryan Patel",
    rating: 5,
    content: "We run a 7-figure agency. GoAds is our go-to for all ad accounts. Never had a single issue in 8 months.",
    date: "Mar 5, 2026",
    platform: "google",
  },
  {
    name: "Marie Dubois",
    rating: 5,
    content: "Service impeccable. Livraison rapide et support réactif. Je recommande à 100%.",
    date: "Mar 3, 2026",
    platform: "telegram",
  },
  {
    name: "Kevin Wu",
    rating: 5,
    content: "Finally found a reliable provider. No hidden fees, accounts delivered as described. Solid.",
    date: "Mar 1, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "Anna Schmidt",
    rating: 5,
    content: "Been using GoAds for TikTok accounts too. Same quality, same support. Very impressed.",
    date: "Feb 27, 2026",
    platform: "google",
  },
  {
    name: "Tommy Lee",
    rating: 5,
    content: "Warranty policy is legit. Had one account issue, got replaced within the hour. No questions.",
    date: "Feb 25, 2026",
    platform: "telegram",
  },
  {
    name: "Isabella Santos",
    rating: 5,
    content: "Best chrome extension for managing multiple BMs. The cookie login feature alone is worth it.",
    date: "Feb 22, 2026",
    platform: "chrome_web_store",
  },
  {
    name: "David Kim",
    rating: 5,
    content: "Scaling Meta ads has never been easier. GoAds handles the infrastructure so we can focus on creative.",
    date: "Feb 20, 2026",
    platform: "facebook",
  },
]

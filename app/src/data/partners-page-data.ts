// GOADS /partners page data — hero + offers grid.
// Offers decoupled from /bm so partner logos don't leak into the BM page.
// 4 partner logos provided; remaining slots fall back to the
// "Illustration coming soon" placeholder (empty imageSrc).

export const partnersHero = {
  bgImage: "/assets/university_bghero.png",
}

export const partnersOffers = {
  subtitle: "ALL PRODUCTS",
  title: "Everything You Need to Scale",
  description:
    "From verified BMs to recovery services. Built for advertisers who refuse to babysit disabled accounts.",
  cards: [
    { imageSrc: "/partner/ADS%20POWER.svg", title: "Business Manager", description: "BM1, BM3, BM5, BM10 — all Meta-verified. Pick the DSL that fits your spend." },
    { imageSrc: "/partner/DOLPHIN.svg", title: "Facebook Profiles", description: "Aged, ID-verified profiles to pair with your BM. Clean history, ready to run." },
    { imageSrc: "/partner/FLOXY.svg", title: "Unban Service", description: "BM banned? Ad account disabled? We recover the asset so you keep the pixel." },
    { imageSrc: "/partner/INCOGNITION.svg", title: "Verified Badge", description: "Blue tick for Pages and Instagram. Instant credibility boost on your BM assets." },
    { imageSrc: "", title: "TikTok Assets", description: "Accounts, Shops, Business Centers. Diversify beyond Meta without the disable risk." },
    { imageSrc: "", title: "Free Tools", description: "BM Invite, Cookie Login, 2FA Generator. Free utilities for media buyers." },
  ],
}

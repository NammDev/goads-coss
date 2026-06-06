// GOADS /partners page data — hero + offers grid.
// Offers decoupled from /bm so partner logos don't leak into the BM page.
// 4 partner logos provided; remaining slots fall back to the
// "Illustration coming soon" placeholder (empty imageSrc).

export const partnersHero = {
  bgImage: "/assets/university_bghero.png",
}

// Each card links out to the partner's site (opens in a new tab). Swap these
// hrefs for your own affiliate / referral links so the discount tracks back to
// GOADS. NOTE: confirm the Floxy domain before publishing.
export const partnersOffers = {
  subtitle: "TRUSTED PARTNERS",
  title: "Tools We Use, Discounts You Get",
  description:
    "Hand-picked ad-tech tools our own media buyers run every day, with exclusive pricing for GOADS clients.",
  cards: [
    {
      imageSrc: "/partner/ADS%20POWER.svg",
      title: "AdsPower",
      description: "Antidetect browser for running unlimited ad accounts in isolated profiles. Exclusive discount for GOADS clients.",
      href: "https://www.adspower.com",
    },
    {
      imageSrc: "/partner/DOLPHIN.svg",
      title: "Dolphin{anty}",
      description: "Antidetect browser built for media buyers managing accounts at scale. Special partner rate inside.",
      href: "https://dolphin-anty.com",
    },
    {
      imageSrc: "/partner/INCOGNITION.svg",
      title: "Incogniton",
      description: "Create and manage hundreds of secure browser profiles, each with its own fingerprint. Partner discount applied.",
      href: "https://incogniton.com",
    },
    {
      imageSrc: "/partner/FLOXY.svg",
      title: "Floxy",
      description: "Fast residential and mobile proxies that keep every ad account on a clean, dedicated IP. GOADS partner pricing.",
      href: "https://floxy.io",
    },
    {
      imageSrc: "/partner/PROXY-CHEAP.svg",
      title: "Proxy-Cheap",
      description: "Affordable residential, mobile and datacenter proxies for ad accounts and antidetect browsers. Exclusive GOADS referral pricing.",
      href: "https://app.proxy-cheap.com/r/uiHz2t",
    },
  ],
}

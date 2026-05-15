// GOADS /aboutus page data — hero + stats + testimonials section
// Hero pattern mirrors /foreplay/unban. Testimonials reuse same ForeplaySolutionTestimonialCard
// component as /foreplay/tools. Quotes adapted to GOADS context (ad infrastructure & service).

// ── Hero (title + bg image — same structure as unbanHero) ──
export const aboutusHero = {
  title: "Built by advertisers, for advertisers",
  bgImage: "/foreplay/university_bghero.png",
}

// ── Hero stats strip ──
export const aboutusStats = [
  { value: "1000+", label: "Active clients" },
  { value: "$50M+", label: "Ad spend powered" },
  { value: "24/7", label: "Support team" },
  { value: "#1", label: "Trusted in market" },
] as const

// ── Team section head — title only (subtitle + description removed per design) ──
export const aboutusTestimonialsSection = {
  subtitle: "",
  title: "Our team",
  description: "",
}

// ── Team members (3 key people — logo/image/bg use placeholder assets, swap with real team photos later) ──
export const aboutusTestimonials = [
  {
    logoText: "GOADS Team",
    logoHref: "#",
    quote:
      "We founded GOADS with a simple vision: to create a more reliable and professional advertising ecosystem for businesses that depend on digital growth. Our mission is not just to provide infrastructure, but to deliver long-term stability, responsive support, and solutions that help our clients scale with confidence in an increasingly complex advertising landscape.",
    authorName: "Justin Bui",
    authorRole: "Founder & CEO",
    authorImageSrc: "/foreplay/solutions_test1_avt.webp",
    bgImageSrc: "/foreplay/solutions_test1_bg.webp",
    bgImageAlt: "Justin Bui — Founder of GOADS",
  },
  {
    logoText: "GOADS Team",
    logoHref: "#",
    quote:
      "Behind GOADS is a technology-first mindset focused on solving real operational challenges. We continuously improve our infrastructure, internal systems, and processes to help clients run advertising operations more securely, efficiently, and sustainably.",
    authorName: "Nam Nguyen",
    authorRole: "Founder & CTO",
    authorImageSrc: "/foreplay/solutions_test2_avt.webp",
    bgImageSrc: "/foreplay/solutions_test2_bg.webp",
    bgImageAlt: "Nam Nguyen — Founder & CTO",
  },
  {
    logoText: "Why GOADS?",
    logoHref: "#",
    quote:
      "Our mission is to help businesses grow through stronger advertising infrastructure and smarter operational support. We're committed to providing dependable solutions that reduce friction, improve efficiency, and allow our clients to focus on scaling their brands with confidence.",
    authorName: "",
    authorRole: "",
    authorImageSrc: "",
    bgImageSrc: "",
    bgImageAlt: "",
  },
]

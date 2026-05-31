// Static data for Foreplay /tempmail page — UI only, no business logic.

export const tempmailHero = {
  subtitle: "",
  title: "Temp Mail by GOADS",
  description: "Disposable email addresses, ready in seconds.",
}

export const tempmailViewer = {
  placeholderEmail: "s8s1nfl5ceysr8qa@buslink24.com",
  loadLabel: "Load",
  loadTooltip: "Load inbox for this address",
  randomLabel: "Random",
  randomTooltip: "Generate a new random address",
  copyLabel: "Copy",
  copyTooltip: "Copy address to clipboard",
  mailboxLabel: "MailBox",
  clearAllLabel: "Clear all",
  clearAllTooltip: "Delete all messages",
  emptyMailbox: "No emails",
  emptyContent: "No content",
}

export const tempmailFaq = {
  title: "Frequently asked questions",
  description: "Quick answers about Temp Mail and how teams use it.",
  items: [
    {
      question: "What is Temp Mail?",
      answer:
        "A disposable email address you can spin up instantly. Use it to receive verification codes, confirmation links, or one-off signup emails without exposing your real inbox.",
    },
    {
      question: "Is the inbox really anonymous?",
      answer:
        "Addresses are randomly generated and not tied to any personal identity. We don't ask for a signup or store any link between addresses.",
    },
    {
      question: "How long do messages stay in the inbox?",
      answer:
        "Messages are kept for a short window so you can read them, then automatically removed. There is no permanent archive.",
    },
    {
      question: "Can I pick my own address?",
      answer:
        "Hit Random to generate a fresh address, or paste any address on the supported domains and load its inbox. No registration required.",
    },
    {
      question: "Is Temp Mail safe to use for signing up to services?",
      answer:
        "Yes — it's purpose-built for that. Use it for tools, trials, and platforms where you don't want to give out your main address.",
    },
    {
      question: "Can I send emails from a Temp Mail address?",
      answer:
        "No — Temp Mail is receive-only. It's designed for verifying signups and receiving one-time codes, not outbound messaging.",
    },
    {
      question: "Does Temp Mail work with Facebook / Google signups?",
      answer:
        "Most platforms accept disposable addresses for verification, but some block them. If a service rejects the address, hit Random to try a different domain.",
    },
  ],
}

// Static help article content keyed by "<category-slug>/<article-slug>".
// Body is plain JSX (React.ReactNode) wrapped in <div className="w-full installation-content">
// by the page component — exactly as docs does — so .installation-content typography applies.
//
// NO Keystatic. NO Markdoc. Edit this file to update content.

import { type ReactNode, createElement as h } from "react"

export type HelpArticle = {
  title: string
  description: string
  lastUpdated: string
  /** Plain React nodes rendered inside <div className="w-full installation-content"> */
  body: ReactNode
}

/** All static help articles keyed by "<tab-slug>/<article-slug>" */
export const helpContent: Record<string, HelpArticle> = {
  // ─── Getting Started ───────────────────────────────────────────────────────

  "getting-started/welcome": {
    title: "Welcome to GoAds Help",
    description:
      "Everything you need to know to get the most out of GoAds and our support resources.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "What is GoAds?"),
      h(
        "p",
        null,
        "GoAds is a managed ad-account platform that gives agencies and media buyers access to whitelisted Meta, Google, and TikTok accounts — with higher spending limits, reduced policy friction, and concierge support.",
      ),
      h("h2", null, "How this Help Center works"),
      h(
        "p",
        null,
        "Browse articles by category using the sidebar on the left. Each article covers a specific topic in plain language. If you cannot find what you need, use the search bar at the top of this page or contact our support team directly.",
      ),
      h("h2", null, "Getting the fastest help"),
      h(
        "ul",
        null,
        h("li", null, "Search first — most common questions are already answered here."),
        h(
          "li",
          null,
          "If your issue is account-specific (billing, account status), go to ",
          h("strong", null, "Account & Billing"),
          " or ",
          h("strong", null, "Troubleshooting"),
          ".",
        ),
        h(
          "li",
          null,
          "To reach a human, click ",
          h("strong", null, "Contact Support"),
          " in the sidebar footer.",
        ),
      ),
      h("h2", null, "Response times"),
      h(
        "p",
        null,
        "Our support team is available Monday–Friday, 9 AM–6 PM EST. We aim to respond to all tickets within 4 business hours.",
      ),
    ),
  },

  "getting-started/create-account": {
    title: "Creating Your Account",
    description:
      "Step-by-step guide to signing up for GoAds and setting up your first ad account.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Before you begin"),
      h(
        "p",
        null,
        "To create a GoAds account you will need a valid business email address, a registered business name, and a payment method (credit card or bank transfer).",
      ),
      h("h2", null, "Step 1 — Sign up"),
      h(
        "p",
        null,
        "Visit goads.com and click ",
        h("strong", null, "Get Started"),
        ". Fill in your name, business email, and choose a password. Check your inbox for a verification email and click the link inside.",
      ),
      h("h2", null, "Step 2 — Complete your profile"),
      h(
        "p",
        null,
        "After verifying your email, you will be prompted to enter your business details: company name, industry, and estimated monthly ad spend. This information helps us assign the right account tier.",
      ),
      h("h2", null, "Step 3 — Choose a plan"),
      h(
        "p",
        null,
        "Select a subscription plan that matches your spend volume. All plans include a 7-day free trial. You will not be charged until the trial period ends.",
      ),
      h("h2", null, "Step 4 — Connect your first ad account"),
      h(
        "p",
        null,
        "From the dashboard, click ",
        h("strong", null, "Add Account"),
        " and follow the on-screen instructions to link your Meta Business Manager, Google Ads manager account, or TikTok Business Center.",
      ),
      h("h2", null, "Need help?"),
      h(
        "p",
        null,
        "If you run into any issues during sign-up, contact our onboarding team via the ",
        h("strong", null, "Contact Support"),
        " link in the sidebar.",
      ),
    ),
  },

  "getting-started/dashboard-overview": {
    title: "Navigating the Dashboard",
    description:
      "A quick tour of the GoAds dashboard so you can find what you need fast.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Dashboard layout"),
      h(
        "p",
        null,
        "The GoAds dashboard is divided into four main areas: the left navigation panel, the top status bar, the main content area, and the quick-action toolbar on the right.",
      ),
      h("h2", null, "Left navigation"),
      h(
        "ul",
        null,
        h("li", null, h("strong", null, "Accounts"), " — view and manage all connected ad accounts."),
        h("li", null, h("strong", null, "Campaigns"), " — create and monitor campaigns across platforms."),
        h("li", null, h("strong", null, "Billing"), " — view invoices and manage payment methods."),
        h("li", null, h("strong", null, "Settings"), " — update your profile, team members, and API keys."),
      ),
      h("h2", null, "Status indicators"),
      h(
        "p",
        null,
        "Each connected account shows a colored status badge: ",
        h("strong", null, "Green"),
        " means active and healthy, ",
        h("strong", null, "Yellow"),
        " means action required, and ",
        h("strong", null, "Red"),
        " means the account is suspended or restricted.",
      ),
      h("h2", null, "Quick actions"),
      h(
        "p",
        null,
        "Use the quick-action toolbar to invite team members, switch between accounts, or access the help center without leaving the current page.",
      ),
    ),
  },

  // ─── Account & Billing ─────────────────────────────────────────────────────

  "billing/manage-subscription": {
    title: "Managing Your Subscription",
    description:
      "How to view, upgrade, downgrade, or cancel your GoAds subscription.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Viewing your current plan"),
      h(
        "p",
        null,
        "Go to ",
        h("strong", null, "Settings → Billing"),
        " to see your current plan, next billing date, and usage metrics.",
      ),
      h("h2", null, "Upgrading your plan"),
      h(
        "p",
        null,
        "Click ",
        h("strong", null, "Upgrade Plan"),
        " and select a higher tier. The upgrade takes effect immediately and you will be charged a prorated amount for the remainder of the billing cycle.",
      ),
      h("h2", null, "Downgrading your plan"),
      h(
        "p",
        null,
        "Downgrades take effect at the end of the current billing period. You retain access to your current tier's features until then.",
      ),
      h("h2", null, "Cancelling your subscription"),
      h(
        "p",
        null,
        "See the ",
        h("strong", null, "Cancellation Policy"),
        " article for full details. In short: cancel any time, retain access until period end, no partial refunds.",
      ),
    ),
  },

  "billing/payment-methods": {
    title: "Accepted Payment Methods",
    description:
      "Which payment methods GoAds accepts and how to update your billing details.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Accepted methods"),
      h(
        "ul",
        null,
        h("li", null, "Visa, Mastercard, and American Express credit/debit cards"),
        h("li", null, "ACH bank transfer (US accounts only)"),
        h("li", null, "SEPA direct debit (EU accounts only)"),
        h("li", null, "Wire transfer (enterprise plans, contact sales)"),
      ),
      h("h2", null, "Adding or updating a payment method"),
      h(
        "p",
        null,
        "Go to ",
        h("strong", null, "Settings → Billing → Payment Methods"),
        ". Click ",
        h("strong", null, "Add Method"),
        " and enter your card details. Your information is encrypted and processed by Stripe — GoAds never stores raw card numbers.",
      ),
      h("h2", null, "Failed payments"),
      h(
        "p",
        null,
        "If a payment fails, we will retry up to three times over 5 days and notify you by email each time. After the third failure, your account is paused until payment is resolved.",
      ),
    ),
  },

  "billing/invoices": {
    title: "Invoices & Receipts",
    description: "How to download invoices and share receipts with your finance team.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Finding your invoices"),
      h(
        "p",
        null,
        "All invoices are available under ",
        h("strong", null, "Settings → Billing → Invoice History"),
        ". Each invoice is listed with its date, amount, and status (Paid / Pending / Failed).",
      ),
      h("h2", null, "Downloading a PDF receipt"),
      h(
        "p",
        null,
        "Click the download icon next to any invoice to get a PDF receipt suitable for expense reporting.",
      ),
      h("h2", null, "Custom billing details"),
      h(
        "p",
        null,
        "To add your company name, VAT number, or billing address to invoices, go to ",
        h("strong", null, "Settings → Billing → Billing Information"),
        " and fill in the required fields. Changes apply to future invoices only.",
      ),
    ),
  },

  "billing/cancellation": {
    title: "Cancellation Policy",
    description: "What happens when you cancel and how to reactivate your account.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "How to cancel"),
      h(
        "p",
        null,
        "Go to ",
        h("strong", null, "Settings → Billing → Cancel Subscription"),
        ". You will be asked for a cancellation reason (optional). Your subscription is cancelled immediately but you retain full access until the end of the current billing period.",
      ),
      h("h2", null, "Refund policy"),
      h(
        "p",
        null,
        "GoAds does not provide partial refunds for unused time within a billing period. If you believe you were charged in error, contact support within 14 days of the charge.",
      ),
      h("h2", null, "Reactivating your account"),
      h(
        "p",
        null,
        "You can reactivate at any time by logging in and selecting a new plan. Your historical data (campaigns, reports) is retained for 90 days after cancellation.",
      ),
    ),
  },

  // ─── Troubleshooting ───────────────────────────────────────────────────────

  "troubleshooting/login-issues": {
    title: "Login & Access Issues",
    description:
      "Troubleshoot problems signing into your GoAds account, including password resets and 2FA.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Forgot your password"),
      h(
        "p",
        null,
        "Click ",
        h("strong", null, "Forgot password?"),
        " on the login page and enter your email address. You will receive a reset link within 2 minutes. Check your spam folder if it doesn't arrive.",
      ),
      h("h2", null, "Two-factor authentication (2FA) issues"),
      h(
        "p",
        null,
        "If your authenticator app is showing an incorrect code, make sure your device clock is synced to network time. Time drift by even 30 seconds can cause TOTP codes to fail.",
      ),
      h(
        "p",
        null,
        "If you've lost access to your 2FA device, use one of your backup codes (saved during 2FA setup) or contact support with proof of identity.",
      ),
      h("h2", null, "Account locked out"),
      h(
        "p",
        null,
        "After 10 consecutive failed login attempts, your account is temporarily locked for 30 minutes. After the lockout period, try again or reset your password.",
      ),
      h("h2", null, "SSO / Google login not working"),
      h(
        "p",
        null,
        "Ensure the Google account you're using matches the email registered with GoAds. If your company enforces SSO, contact your IT administrator to verify that GoAds is an approved application.",
      ),
    ),
  },

  "troubleshooting/ad-account-connection": {
    title: "Ad Account Not Connecting",
    description:
      "Fix common errors when linking Meta, Google, or TikTok ad accounts to GoAds.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Meta / Facebook ad account"),
      h(
        "ul",
        null,
        h(
          "li",
          null,
          "Ensure you are connecting with a Facebook account that has ",
          h("strong", null, "Admin"),
          " access to the Business Manager.",
        ),
        h(
          "li",
          null,
          "The Business Manager must not be restricted or flagged for policy violations.",
        ),
        h(
          "li",
          null,
          "Try disconnecting the Facebook app from your Meta security settings and reconnecting.",
        ),
      ),
      h("h2", null, "Google Ads account"),
      h(
        "ul",
        null,
        h(
          "li",
          null,
          "The Google account must have Manager Account (MCC) access or be an admin on the target account.",
        ),
        h(
          "li",
          null,
          "Make sure you grant all requested OAuth scopes during the connection flow — partial permission causes a silent failure.",
        ),
      ),
      h("h2", null, "TikTok Ads account"),
      h(
        "ul",
        null,
        h("li", null, "Use the email/password login, not phone login, during the TikTok OAuth flow."),
        h("li", null, "The TikTok Business Center must be active and not under review."),
      ),
      h("h2", null, "Still stuck?"),
      h(
        "p",
        null,
        "Contact support with a screenshot of the error message and we will investigate within 4 business hours.",
      ),
    ),
  },

  "troubleshooting/billing-errors": {
    title: "Billing Errors",
    description: "Common billing error messages and how to resolve them.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Card declined"),
      h(
        "p",
        null,
        "This usually means your bank blocked the transaction. Try:",
      ),
      h(
        "ul",
        null,
        h("li", null, "Contacting your bank to authorize international/recurring charges."),
        h("li", null, "Adding a different card under Settings → Billing → Payment Methods."),
        h("li", null, "Using a bank transfer instead."),
      ),
      h("h2", null, 'Error: "Invoice amount mismatch"'),
      h(
        "p",
        null,
        "This can occur if you upgraded mid-cycle. The prorated amount is calculated automatically. If the total looks wrong, contact support with your invoice number.",
      ),
      h("h2", null, 'Error: "Tax ID not recognized"'),
      h(
        "p",
        null,
        "Ensure your VAT or GST number is entered without spaces or dashes (e.g., ",
        h("code", null, "GB123456789"),
        " not ",
        h("code", null, "GB 123 456 789"),
        "). EU VAT numbers must include the country prefix.",
      ),
    ),
  },

  "troubleshooting/report-bug": {
    title: "Report a Bug",
    description: "How to submit a bug report so our engineering team can investigate quickly.",
    lastUpdated: "May 2025",
    body: h(
      "div",
      null,
      h("h2", null, "Before reporting"),
      h(
        "p",
        null,
        "Please check if the issue is already listed on our status page at status.goads.com. If there is an active incident, our team is already working on a fix.",
      ),
      h("h2", null, "What to include in your report"),
      h(
        "ul",
        null,
        h("li", null, "A clear description of what happened vs. what you expected."),
        h("li", null, "Steps to reproduce the issue (numbered list is ideal)."),
        h("li", null, "Screenshots or a screen recording if available."),
        h("li", null, "Your browser name and version (e.g., Chrome 124)."),
        h("li", null, "Your GoAds account email."),
      ),
      h("h2", null, "How to submit"),
      h(
        "p",
        null,
        "Use the ",
        h("strong", null, "Contact Support"),
        " link in the sidebar and select ",
        h("strong", null, "Bug Report"),
        " as the issue type. Our engineering team will acknowledge your report within 1 business day.",
      ),
    ),
  },
}

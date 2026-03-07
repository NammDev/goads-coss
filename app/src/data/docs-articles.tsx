import { DocsCallout } from "@/components/docs-callout"
import type { ReactNode } from "react"

export type DocsArticleData = {
  title: string
  description: string
  lastUpdated: string
  content: ReactNode
}

export const docsArticles: Record<string, DocsArticleData> = {
  "getting-started/what-is-agency-account": {
    title: "What is an Agency Ad Account?",
    description:
      "Learn what agency ad accounts are, how they differ from personal accounts, and why advertisers use them to scale.",
    lastUpdated: "March 2026",
    content: (
      <>
        <h2>Overview</h2>
        <p>
          An agency ad account is a special type of advertising account created
          under a verified agency&apos;s Business Manager. These accounts come
          with higher spending limits, better support from ad platforms, and
          reduced risk of bans compared to personal ad accounts.
        </p>
        <DocsCallout variant="info" title="Why Agency Accounts?">
          Agency accounts are pre-approved by ad platforms, giving you access to
          features and limits that personal accounts don&apos;t have.
        </DocsCallout>
        <h2>Key Benefits</h2>
        <ul>
          <li>
            <strong>Higher Spending Limits</strong> — Start with $250-$500/day
            limits instead of $50/day on new personal accounts
          </li>
          <li>
            <strong>Reduced Ban Risk</strong> — Agency accounts are vetted and
            have a trust history with the platform
          </li>
          <li>
            <strong>Platform Support</strong> — Direct access to platform
            representatives for account issues
          </li>
          <li>
            <strong>Multiple Accounts</strong> — Run separate campaigns without
            cross-contamination risk
          </li>
        </ul>
        <h2>How GoAds Provides Agency Accounts</h2>
        <p>
          GoAds partners with verified agencies across multiple ad platforms. When
          you purchase an account, we provision it under our partner agency&apos;s
          Business Manager and grant you advertiser access. You get full control
          over campaigns, creatives, and targeting.
        </p>
        <DocsCallout variant="tip" title="7-Day Warranty">
          Every account comes with a 7-day warranty. If your account gets
          disabled within 7 days of purchase (for reasons not caused by policy
          violations on your part), we replace it free of charge.
        </DocsCallout>
        <h2>Personal vs Agency Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Personal Account</th>
              <th>Agency Account</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Initial Spend Limit</td>
              <td>$50/day</td>
              <td>$250-500/day</td>
            </tr>
            <tr>
              <td>Ban Risk</td>
              <td>High</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>Platform Support</td>
              <td>Basic</td>
              <td>Priority</td>
            </tr>
            <tr>
              <td>Account Recovery</td>
              <td>Difficult</td>
              <td>Assisted</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  "meta/ad-accounts/setup-guide": {
    title: "Setting Up Your Meta Ad Account",
    description:
      "Step-by-step guide to setting up and configuring your Meta agency ad account for campaigns.",
    lastUpdated: "March 2026",
    content: (
      <>
        <h2>Before You Start</h2>
        <p>
          Make sure you have received your account credentials from GoAds. You
          will need access to the Business Manager where your ad account is
          hosted.
        </p>
        <DocsCallout variant="warning" title="Important">
          Never change the Business Manager settings or admin permissions. This
          can trigger a security review and disable your account.
        </DocsCallout>
        <h2>Step 1: Accept the Invitation</h2>
        <p>
          After purchase, you&apos;ll receive an email invitation from Meta
          Business Suite. Click the link to accept and join the Business Manager
          as an advertiser.
        </p>
        <h2>Step 2: Navigate to Your Ad Account</h2>
        <ol>
          <li>Go to <strong>business.facebook.com</strong></li>
          <li>Click on <strong>Business Settings</strong> in the left sidebar</li>
          <li>Under <strong>Accounts</strong>, select <strong>Ad Accounts</strong></li>
          <li>You should see your assigned ad account listed</li>
        </ol>
        <h2>Step 3: Add Your Payment Method</h2>
        <p>
          Navigate to the ad account&apos;s payment settings and add your preferred
          payment method. We recommend using a credit card for faster processing.
        </p>
        <DocsCallout variant="tip" title="Pro Tip">
          Use a payment method that matches the country of the ad account for
          best results. Mismatched regions can trigger additional verification.
        </DocsCallout>
        <h2>Step 4: Set Up Your Pixel</h2>
        <p>
          Install the Meta Pixel on your website to track conversions. Go to{" "}
          <strong>Events Manager</strong> and create a new pixel, then add the
          code to your website&apos;s header.
        </p>
        <h2>Step 5: Launch Your First Campaign</h2>
        <p>
          You&apos;re now ready to create campaigns! Go to <strong>Ads Manager</strong>,
          click <strong>Create</strong>, and choose your campaign objective.
        </p>
      </>
    ),
  },
  "billing/warranty-policy": {
    title: "Warranty & Refund Policy",
    description:
      "Understand our 7-day warranty, refund process, and what is covered.",
    lastUpdated: "March 2026",
    content: (
      <>
        <h2>7-Day Warranty</h2>
        <p>
          All ad accounts purchased from GoAds come with a 7-day warranty
          starting from the date of delivery. If your account is disabled within
          this period due to platform-side issues, we will replace it at no
          additional cost.
        </p>
        <h2>What&apos;s Covered</h2>
        <ul>
          <li>Account disabled due to platform review or system error</li>
          <li>Account restricted without prior policy violation from your end</li>
          <li>Account inaccessible due to Business Manager issues</li>
        </ul>
        <h2>What&apos;s NOT Covered</h2>
        <ul>
          <li>Policy violations caused by your ads or landing pages</li>
          <li>Sharing account credentials with unauthorized users</li>
          <li>Modifying Business Manager settings or permissions</li>
          <li>Running prohibited content (adult, gambling, misleading claims)</li>
        </ul>
        <DocsCallout variant="warning" title="Warranty Void">
          Running ads that violate the platform&apos;s advertising policies will
          void your warranty. Always review the platform&apos;s ad policies
          before launching campaigns.
        </DocsCallout>
        <h2>Refund Process</h2>
        <ol>
          <li>Contact our support team within 7 days of account delivery</li>
          <li>Provide your order ID and a screenshot of the disabled account</li>
          <li>Our team will verify the issue within 24 hours</li>
          <li>If approved, a replacement account will be delivered within 48 hours</li>
        </ol>
        <h2>Contact Support</h2>
        <p>
          Reach our support team 24/7 via Telegram at{" "}
          <strong>@GoAdsSupport</strong> or email{" "}
          <strong>support@goads.shop</strong>.
        </p>
      </>
    ),
  },
}

export function getArticle(slug: string): DocsArticleData | undefined {
  return docsArticles[slug]
}

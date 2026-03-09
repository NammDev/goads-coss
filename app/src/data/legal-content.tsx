import type { ReactNode } from 'react'

interface LegalPage {
  title: string
  lastUpdated: string
  content: ReactNode
}

export const termsOfService: LegalPage = {
  title: 'Terms of Service',
  lastUpdated: 'March 9, 2026',
  content: (
    <>
      <h2>Introduction</h2>
      <p>
        Welcome to GoAds (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;).
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website located at goads.shop
        and all related services provided by GoAds.
      </p>
      <p>
        By accessing or using our services, you agree to be bound by these Terms. If you disagree with
        any part of these Terms, you may not access our services.
      </p>

      <h2>Services</h2>
      <p>
        GoAds provides advertising assets and related services, including but not limited to: Business
        Managers, agency ad accounts, Facebook profiles, pages, TikTok assets, account recovery
        services, and blue badge verification support.
      </p>
      <p>
        All assets are prepared to help advertisers launch and scale campaigns on Meta, Google, and
        TikTok platforms.
      </p>

      <h2>Account Responsibility</h2>
      <p>
        Once an asset has been delivered and begins to be used, the responsibility for its operation and
        compliance with platform policies belongs to the client. You are responsible for ensuring that
        your use of any advertising assets complies with the respective platform&apos;s advertising
        policies.
      </p>

      <h2>Warranty Policy</h2>
      <p>
        All assets are delivered in working condition and carefully checked before delivery. Our warranty
        covers replacement only &mdash; refunds are not provided under any circumstances.
      </p>
      <ul>
        <li>
          <strong>Business Manager warranty (72 hours):</strong> If a Business Manager becomes restricted
          or disabled within 72 hours after delivery, GoAds will provide a replacement, provided that no
          activity has been performed inside the Business Manager.
        </li>
        <li>
          <strong>Facebook Profile warranty (7 days):</strong> If a profile becomes restricted or disabled
          within the warranty period, GoAds will provide a replacement with no limit on the number of
          replacements during the 7-day period.
        </li>
      </ul>

      <h2>Warranty Exclusions</h2>
      <p>Warranty requests may be declined if:</p>
      <ul>
        <li>The asset has already been used or modified</li>
        <li>Payment methods, domains, or pages have been added</li>
        <li>Advertisements have been launched</li>
        <li>The asset has been exposed to risk due to policy violations or flagged payment methods/domains</li>
      </ul>

      <h2>Payment</h2>
      <p>
        GoAds accepts multiple payment methods including cryptocurrency (USDT, BTC, ETH), bank transfer,
        and other common international payment options. Payment details and guidance are provided by the
        team to ensure a smooth and secure transaction process.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The GoAds website, its original content, features, and functionality are owned by GoAds and are
        protected by international copyright, trademark, and other intellectual property laws.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        GoAds shall not be liable for any indirect, incidental, special, consequential, or punitive
        damages resulting from your use of our services, including but not limited to account
        restrictions imposed by third-party platforms.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We reserve the right to modify or replace these Terms at any time. We will provide notice of
        changes by updating the &ldquo;Last updated&rdquo; date at the top of this page. Your continued
        use of our services after any changes constitutes acceptance of the new Terms.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about these Terms, contact us through:
      </p>
      <ul>
        <li>Telegram: @goads_official</li>
        <li>WhatsApp: +84 865 717 497</li>
      </ul>
    </>
  ),
}

export const privacyPolicy: LegalPage = {
  title: 'Privacy Policy',
  lastUpdated: 'March 9, 2026',
  content: (
    <>
      <h2>Introduction</h2>
      <p>
        GoAds (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
        Privacy Policy explains how we collect, use, and protect your information when you visit our
        website at goads.shop or use our services.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Contact information:</strong> Name, email address, Telegram username, WhatsApp number
          when you reach out to us.
        </li>
        <li>
          <strong>Transaction data:</strong> Payment method, order details, and delivery information
          related to your purchases.
        </li>
        <li>
          <strong>Usage data:</strong> Browser type, IP address, pages visited, and time spent on our
          website, collected automatically through analytics tools.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Provide customer support and respond to inquiries</li>
        <li>Improve our website and services</li>
        <li>Send order updates and relevant communications</li>
        <li>Prevent fraud and ensure security</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share
        information only with trusted payment processors to complete transactions, or when required by
        law.
      </p>

      <h2>Cookies</h2>
      <p>
        Our website may use cookies and similar technologies to enhance your browsing experience and
        collect usage data. You can control cookie settings through your browser preferences.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect your personal information from unauthorized access,
        alteration, disclosure, or destruction. However, no method of transmission over the Internet is
        100% secure.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for the privacy
        practices or content of those external sites.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to your personal data</li>
        <li>Request correction or deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with
        an updated revision date.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy, contact us through:
      </p>
      <ul>
        <li>Telegram: @goads_official</li>
        <li>WhatsApp: +84 865 717 497</li>
      </ul>
    </>
  ),
}

export const refundPolicy: LegalPage = {
  title: 'Refund Policy',
  lastUpdated: 'March 9, 2026',
  content: (
    <>
      <h2>Overview</h2>
      <p>
        At GoAds, all assets are delivered in working condition and carefully checked before delivery.
        Our policy covers <strong>replacement only</strong> &mdash; refunds are not provided under any
        circumstances.
      </p>

      <h2>Replacement Policy</h2>
      <p>
        If an asset becomes restricted or disabled within the warranty period and meets our warranty
        conditions, GoAds will provide a free replacement.
      </p>

      <h3>Business Manager (72-hour warranty)</h3>
      <p>
        If a Business Manager becomes restricted or disabled within 72 hours after delivery, GoAds will
        provide a replacement, provided that no activity has been performed inside the Business Manager.
      </p>
      <p>Activities that void the warranty:</p>
      <ul>
        <li>Adding payment methods</li>
        <li>Running advertisements</li>
        <li>Creating ad accounts or pages</li>
        <li>Adding or verifying domains</li>
        <li>Making administrative or structural changes</li>
      </ul>

      <h3>Facebook Profile (7-day warranty)</h3>
      <p>
        All Facebook Profiles include a 7-day warranty from delivery. If a profile becomes restricted
        or disabled within the warranty period, GoAds will provide a replacement with no limit on the
        number of replacements during the 7-day period.
      </p>

      <h2>When Replacement Does Not Apply</h2>
      <p>Replacement requests may be declined if:</p>
      <ul>
        <li>The asset has already been used or modified</li>
        <li>Payment methods, domains, or pages have been added</li>
        <li>Advertisements have been launched</li>
        <li>
          The asset has been exposed to risk due to policy violations or flagged payment methods/domains
        </li>
      </ul>
      <p>
        Assets that have already been used cannot be resold as new and do not qualify for replacement.
      </p>

      <h2>How to Request a Replacement</h2>
      <p>
        To request a replacement, contact our support team within the warranty period with your order
        details and a screenshot of the issue:
      </p>
      <ul>
        <li>Telegram: @goads_official</li>
        <li>WhatsApp: +84 865 717 497</li>
      </ul>
    </>
  ),
}

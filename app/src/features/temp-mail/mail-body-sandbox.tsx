"use client"

import { useMemo } from "react"

import { hardenMailLinks } from "@/lib/mail/mail-sanitizer"

const CSP = [
  "default-src 'none'",
  "img-src 'self' data: blob: https: http:",
  "media-src 'self' data: blob: https: http:",
  "font-src data: https:",
  "style-src 'unsafe-inline'",
  "base-uri 'none'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ")

export function MailBodySandbox({
  html,
  title = "Mail body",
  className,
}: {
  html?: string
  title?: string
  className?: string
}) {
  const srcDoc = useMemo(() => {
    const sanitizedHtml = hardenMailLinks(html || "")
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="${CSP}">
    <meta name="referrer" content="no-referrer">
    <base target="_blank">
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        padding: 0;
        color: #111827;
        background: #ffffff;
        font: 14px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        overflow-wrap: anywhere;
      }
      img { max-width: 100%; height: auto; }
      video { max-width: 100%; height: auto; }
      a { color: #047c74; }
      table { max-width: 100%; border-collapse: collapse; }
      pre { white-space: pre-wrap; }
    </style>
  </head>
  <body>${sanitizedHtml}</body>
</html>`
  }, [html])

  return (
    <iframe
      className={className}
      sandbox="allow-same-origin"
      referrerPolicy="no-referrer"
      title={title}
      srcDoc={srcDoc}
    />
  )
}

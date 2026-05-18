import { createHmac, timingSafeEqual } from "crypto";

/**
 * Verify a Wise webhook signature.
 *
 * Wise signs the raw request body with HMAC-SHA256 using the webhook secret
 * and sends the hex digest in the X-Wise-Signature header.
 *
 * IMPORTANT: rawBody must be the exact bytes received (before JSON.parse)
 * so the HMAC is computed over the unmodified payload.
 *
 * Uses timingSafeEqual to prevent timing-based secret discovery.
 */
export function verifyWiseWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;

  try {
    const computed = createHmac("sha256", secret)
      .update(rawBody, "utf8")
      .digest("hex");

    // timingSafeEqual requires same-length buffers
    const computedBuf = Buffer.from(computed, "hex");
    const headerBuf = Buffer.from(signatureHeader, "hex");

    if (computedBuf.length !== headerBuf.length) return false;

    return timingSafeEqual(computedBuf, headerBuf);
  } catch {
    return false;
  }
}

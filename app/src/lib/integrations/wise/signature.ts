import { createVerify, timingSafeEqual, createHmac } from "crypto";

/**
 * Wise sandbox public key (RSA, SHA256).
 * Source: https://docs.wise.com/guides/developer/webhooks/event-handling
 */
const WISE_SANDBOX_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwpb91cEYuyJNQepZAVfP
ZIlPZfNUefH+n6w9SW3fykqKu938cR7WadQv87oF2VuT+fDt7kqeRziTmPSUhqPU
ys/V2Q1rlfJuXbE+Gga37t7zwd0egQ+KyOEHQOpcTwKmtZ81ieGHynAQzsn1We3j
wt760MsCPJ7GMT141ByQM+yW1Bx+4SG3IGjXWyqOWrcXsxAvIXkpUD/jK/L958Cg
nZEgz0BSEh0QxYLITnW1lLokSx/dTianWPFEhMC9BgijempgNXHNfcVirg1lPSyg
z7KqoKUN0oHqWLr2U1A+7kqrl6O2nx3CKs1bj1hToT1+p4kcMoHXA7kA+VBLUpEs
VwIDAQAB
-----END PUBLIC KEY-----`;

/**
 * Wise production public key (RSA, SHA256).
 * Source: https://docs.wise.com/guides/developer/webhooks/event-handling
 */
const WISE_PRODUCTION_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvO8vXV+JksBzZAY6GhSO
XdoTCfhXaaiZ+qAbtaDBiu2AGkGVpmEygFmWP4Li9m5+Ni85BhVvZOodM9epgW3F
bA5Q1SexvAF1PPjX4JpMstak/QhAgl1qMSqEevL8cmUeTgcMuVWCJmlge9h7B1CS
D4rtlimGZozG39rUBDg6Qt2K+P4wBfLblL0k4C4YUdLnpGYEDIth+i8XsRpFlogx
CAFyH9+knYsDbR43UJ9shtc42Ybd40Afihj8KnYKXzchyQ42aC8aZ/h5hyZ28yVy
Oj3Vos0VdBIs/gAyJ/4yyQFCXYte64I7ssrlbGRaco4nKF3HmaNhxwyKyJafz19e
HwIDAQAB
-----END PUBLIC KEY-----`;

/**
 * Verify a Wise webhook signature.
 *
 * Wise signs the raw request body with RSA-SHA256 and sends the Base64-encoded
 * signature in the X-Signature-SHA256 header.
 *
 * We try both sandbox and production keys so the same code works in both envs.
 *
 * IMPORTANT: rawBody must be the exact bytes received (before JSON.parse).
 */
export function verifyWiseWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  _secret: string, // kept for API compatibility, not used — Wise uses RSA not HMAC
): boolean {
  if (!signatureHeader) return false;

  // Signature is Base64-encoded
  const signatureBuffer = Buffer.from(signatureHeader, "base64");

  const publicKeys = [WISE_SANDBOX_PUBLIC_KEY, WISE_PRODUCTION_PUBLIC_KEY];

  for (const publicKey of publicKeys) {
    try {
      const verify = createVerify("SHA256");
      verify.update(rawBody, "utf8");
      verify.end();
      if (verify.verify(publicKey, signatureBuffer)) {
        return true;
      }
    } catch {
      // try next key
    }
  }

  return false;
}

/**
 * Legacy HMAC helper — kept in case it's needed for other integrations.
 * NOT used by Wise webhooks.
 */
export function verifyHmacSha256(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;
  try {
    const computed = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
    const computedBuf = Buffer.from(computed, "hex");
    const headerBuf = Buffer.from(signatureHeader, "hex");
    if (computedBuf.length !== headerBuf.length) return false;
    return timingSafeEqual(computedBuf, headerBuf);
  } catch {
    return false;
  }
}

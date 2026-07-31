// RFC 4226 / RFC 6238 TOTP, used by goads-bm-2fa.js.
//
// Facebook hands back a base32 secret and then expects a valid 6-digit code
// computed from it before it will switch 2FA on — so the code has to be derived
// here, in the page, from that secret. WebCrypto does the HMAC; the base32
// decode and the dynamic truncation are the parts RFC 4226 spells out.

var B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

/** base32 (RFC 4648, padding tolerated) → Uint8Array. */
export function base32Decode(input) {
  var clean = String(input).toUpperCase().replace(/=+$/, "").replace(/\s+/g, "")
  var bits = 0
  var value = 0
  var out = []
  for (var i = 0; i < clean.length; i++) {
    var idx = B32_ALPHABET.indexOf(clean[i])
    if (idx === -1) throw new Error("Invalid character in secret key")
    value = (value << 5) | idx
    bits += 5
    if (bits >= 8) {
      bits -= 8
      out.push((value >>> bits) & 0xff)
    }
  }
  return new Uint8Array(out)
}

/**
 * TOTP code for `secret` at `timeMs`.
 * step/digits default to the values Facebook's authenticator flow expects.
 */
export async function totpCode(secret, timeMs, step, digits) {
  step = step || 30
  digits = digits || 6

  var counter = Math.floor(timeMs / 1000 / step)
  // 8-byte big-endian counter. Split high/low so we never shift past 32 bits.
  var msg = new Uint8Array(8)
  var high = Math.floor(counter / 0x100000000)
  var low = counter >>> 0
  for (var i = 3; i >= 0; i--) {
    msg[i] = high & 0xff
    high = high >>> 8
    msg[i + 4] = low & 0xff
    low = low >>> 8
  }

  var key = await crypto.subtle.importKey(
    "raw",
    base32Decode(secret),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  )
  var mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, msg))

  // RFC 4226 dynamic truncation: low nibble of the last byte picks the offset.
  var offset = mac[mac.length - 1] & 0x0f
  var bin =
    ((mac[offset] & 0x7f) << 24) |
    ((mac[offset + 1] & 0xff) << 16) |
    ((mac[offset + 2] & 0xff) << 8) |
    (mac[offset + 3] & 0xff)

  var code = String(bin % Math.pow(10, digits))
  while (code.length < digits) code = "0" + code
  return code
}

/** Seconds left in the current TOTP window — drives the countdown pill. */
export function secondsLeft(timeMs, step) {
  step = step || 30
  return step - (Math.floor(timeMs / 1000) % step)
}

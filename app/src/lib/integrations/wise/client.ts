import type { WiseCreatePaymentInput, WiseCreatePaymentResult } from "./types";

/** Typed error thrown by the Wise gateway client on non-2xx responses */
export class WiseGatewayError extends Error {
  constructor(
    public readonly reason:
      | "NETWORK"
      | "AUTH"
      | "RATE_LIMIT"
      | "BAD_REQUEST"
      | "UPSTREAM_5XX"
      | "UNKNOWN",
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "WiseGatewayError";
  }
}

/** Interface for the Wise payment gateway client */
export interface WiseClient {
  createPayment(input: WiseCreatePaymentInput): Promise<WiseCreatePaymentResult>;
  cancelPayment(gatewayPaymentId: string): Promise<void>;
}

// ─── Real client ──────────────────────────────────────────────────────────────

function buildRealClient(): WiseClient {
  const apiBase = process.env.WISE_API_BASE_URL ?? "https://api.wise-sandbox.com";
  const apiToken = process.env.WISE_API_TOKEN;
  const profileId = process.env.WISE_PROFILE_ID;

  if (!apiToken || !profileId) {
    throw new Error(
      "WISE_API_TOKEN and WISE_PROFILE_ID must be set in environment variables.",
    );
  }

  async function fetchWise<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(`${apiBase}${path}`, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
          ...(options.headers ?? {}),
        },
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        const reason =
          res.status === 401 || res.status === 403
            ? "AUTH"
            : res.status === 429
              ? "RATE_LIMIT"
              : res.status >= 500
                ? "UPSTREAM_5XX"
                : res.status >= 400
                  ? "BAD_REQUEST"
                  : "UNKNOWN";
        throw new WiseGatewayError(
          reason,
          `Wise API error ${res.status}: ${body}`,
        );
      }

      return res.json() as Promise<T>;
    } catch (err) {
      if (err instanceof WiseGatewayError) throw err;
      throw new WiseGatewayError("NETWORK", "Network error calling Wise API", err);
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    async createPayment(input: WiseCreatePaymentInput): Promise<WiseCreatePaymentResult> {
      // Wise Pay Links API — creates a payment link with QR code
      // Reference: https://docs.wise.com/api-docs/features/pay-links
      const body = {
        profileId,
        amount: {
          value: input.amount,
          currency: input.currency,
        },
        reference: input.reference,
        expiresAt: input.expiresAt.toISOString(),
        description: input.description ?? `GoAds wallet top-up ${input.reference}`,
      };

      const data = await fetchWise<{
        id: string;
        url: string;
        qrCode: string;
        expiresAt: string;
      }>(`/v1/profiles/${profileId}/pay-links`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      return {
        gatewayPaymentId: data.id,
        paymentUrl: data.url,
        qrCodeData: data.qrCode,
        expiresAt: new Date(data.expiresAt),
      };
    },

    async cancelPayment(gatewayPaymentId: string): Promise<void> {
      await fetchWise(`/v1/profiles/${profileId}/pay-links/${gatewayPaymentId}/cancel`, {
        method: "POST",
      });
    },
  };
}

// ─── Mock client (dev / test) ─────────────────────────────────────────────────

function buildMockClient(): WiseClient {
  return {
    async createPayment(input: WiseCreatePaymentInput): Promise<WiseCreatePaymentResult> {
      // Simulate a small network delay
      await new Promise((r) => setTimeout(r, 200));

      const gatewayPaymentId = `mock_${input.reference}`;
      // Generate a simple QR code data URL placeholder
      const qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`wise:pay?ref=${input.reference}&amount=${input.amount}`)}`;

      return {
        gatewayPaymentId,
        paymentUrl: `https://wise.com/pay/mock/${input.reference}`,
        qrCodeData,
        expiresAt: input.expiresAt,
      };
    },

    async cancelPayment(_gatewayPaymentId: string): Promise<void> {
      // no-op in mock
    },
  };
}

// ─── Factory ──────────────────────────────────────────────────────────────────

let _client: WiseClient | null = null;

/**
 * Returns the Wise gateway client.
 * Uses the mock client when WISE_USE_MOCK=true (default in dev/test).
 * Singleton — constructed once per process.
 */
export function getWiseClient(): WiseClient {
  if (_client) return _client;

  const useMock =
    process.env.WISE_USE_MOCK === "true" ||
    (process.env.NODE_ENV !== "production" && !process.env.WISE_API_TOKEN);

  _client = useMock ? buildMockClient() : buildRealClient();
  return _client;
}

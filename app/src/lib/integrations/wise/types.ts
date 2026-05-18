/** Input for creating a Wise payment intent */
export type WiseCreatePaymentInput = {
  reference: string;
  amount: number;
  currency: "USD";
  expiresAt: Date;
  description?: string;
};

/** Result returned by Wise after creating a payment intent */
export type WiseCreatePaymentResult = {
  gatewayPaymentId: string;
  paymentUrl: string;
  /** Raw QR code payload — rendered by the FE using a QR library */
  qrCodeData: string;
  expiresAt: Date;
};

/** Wise webhook event types */
export type WiseWebhookEvent =
  | {
      type: "payment.completed";
      data: {
        reference: string;
        gatewayPaymentId: string;
        amount: number;
        currency: string;
        paidAt: string;
      };
    }
  | {
      type: "payment.failed";
      data: {
        reference: string;
        gatewayPaymentId: string;
        reason: string;
      };
    }
  | {
      type: "payment.expired";
      data: {
        reference: string;
        gatewayPaymentId: string;
      };
    };

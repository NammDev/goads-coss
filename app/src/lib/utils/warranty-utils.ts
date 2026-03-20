import { differenceInDays } from "date-fns";

/** Returns days remaining until warranty expires. Negative = expired. */
export function getWarrantyDaysRemaining(warrantyUntil: Date | null): number {
  if (!warrantyUntil) return -1;
  return differenceInDays(warrantyUntil, new Date());
}

export type WarrantyDisplayStatus =
  | "active"
  | "expiring"
  | "expired"
  | "claimed"
  | "replaced";

/** Derives display status from warranty date + claim status. */
export function getWarrantyDisplayStatus(
  warrantyUntil: Date | null,
  claimStatus: string | null,
): WarrantyDisplayStatus {
  if (claimStatus === "replaced") return "replaced";
  if (
    claimStatus === "pending" ||
    claimStatus === "approved" ||
    claimStatus === "rejected"
  )
    return "claimed";

  const daysRemaining = getWarrantyDaysRemaining(warrantyUntil);
  if (daysRemaining < 0) return "expired";
  if (daysRemaining <= 2) return "expiring";
  return "active";
}

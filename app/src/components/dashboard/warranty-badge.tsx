import { ShieldCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getWarrantyDaysRemaining,
  getWarrantyDisplayStatus,
} from "@/lib/utils/warranty-utils";

interface Props {
  warrantyUntil: Date | null;
  claimStatus?: string | null;
}

const STATUS_CONFIG = {
  active: {
    className:
      "bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400",
  },
  expiring: {
    className:
      "bg-amber-100 text-amber-800 border-transparent dark:bg-amber-900/30 dark:text-amber-400",
  },
  expired: {
    className:
      "bg-gray-100 text-gray-600 border-transparent dark:bg-gray-800 dark:text-gray-400",
  },
  claimed: {
    className:
      "bg-blue-100 text-blue-800 border-transparent dark:bg-blue-900/30 dark:text-blue-400",
  },
  replaced: {
    className:
      "bg-emerald-100 text-emerald-800 border-transparent dark:bg-emerald-900/30 dark:text-emerald-400",
  },
} as const;

export function WarrantyBadge({ warrantyUntil, claimStatus = null }: Props) {
  const displayStatus = getWarrantyDisplayStatus(warrantyUntil, claimStatus);
  const daysRemaining = getWarrantyDaysRemaining(warrantyUntil);
  const config = STATUS_CONFIG[displayStatus];

  let label: string;
  switch (displayStatus) {
    case "active":
      label = `${daysRemaining}d left`;
      break;
    case "expiring":
      label = "Expiring soon";
      break;
    case "expired":
      label = "Expired";
      break;
    case "claimed":
      label = "Claimed";
      break;
    case "replaced":
      label = "Replaced";
      break;
  }

  return (
    <Badge variant="outline" className={`text-xs gap-1 ${config.className}`}>
      <ShieldCheckIcon className="size-3" />
      {label}
    </Badge>
  );
}

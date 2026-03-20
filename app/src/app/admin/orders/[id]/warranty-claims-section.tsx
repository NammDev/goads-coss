import { format } from "date-fns";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWarrantyClaimsByOrderId } from "@/lib/db/queries/warranty-queries";
import { WarrantyClaimActions } from "./warranty-claim-actions";

interface Props {
  orderId: string;
}

const STATUS_CONFIG = {
  pending: "bg-yellow-100 text-yellow-800 border-transparent dark:bg-yellow-900/30 dark:text-yellow-400",
  approved: "bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-800 border-transparent dark:bg-red-900/30 dark:text-red-400",
  replaced: "bg-emerald-100 text-emerald-800 border-transparent dark:bg-emerald-900/30 dark:text-emerald-400",
} as const;

export async function WarrantyClaimsSection({ orderId }: Props) {
  const claims = await getWarrantyClaimsByOrderId(orderId);
  if (claims.length === 0) return null;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <span className="text-lg font-semibold">Warranty Claims</span>
      </CardHeader>
      <CardContent className="space-y-4">
        {claims.map((claim) => (
          <div
            key={claim.id}
            className="rounded-lg border p-4 space-y-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium font-mono">
                    {claim.itemUid ?? claim.deliveredItemId.slice(-8)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {claim.itemProductType}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${STATUS_CONFIG[claim.status]}`}
                  >
                    {claim.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Submitted {format(new Date(claim.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Reason
              </p>
              <p className="text-sm">{claim.reason}</p>
            </div>

            {claim.adminNote && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Admin Note
                </p>
                <p className="text-sm text-muted-foreground">{claim.adminNote}</p>
              </div>
            )}

            {claim.replacementItemId && (
              <p className="text-xs text-muted-foreground">
                Replacement: <span className="font-mono">{claim.replacementItemId}</span>
              </p>
            )}

            <WarrantyClaimActions claim={claim} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

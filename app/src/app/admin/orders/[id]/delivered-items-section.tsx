"use client";

import { format } from "date-fns";
import { ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { decrypt } from "@/lib/db/encryption";
import type { DeliveredItem } from "@/lib/db/queries/order-queries";

interface Props {
  items: DeliveredItem[];
}

function decryptCredentials(raw: string | null): Record<string, string> {
  if (!raw) return {};
  try {
    // Try to decrypt first
    const decrypted = decrypt(raw);
    return JSON.parse(decrypted) as Record<string, string>;
  } catch {
    // Fallback: may already be plain JSON (dev/legacy)
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      return {};
    }
  }
}

export function DeliveredItemsSection({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <span className="text-lg font-semibold">Delivered Credentials</span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Credentials</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Warranty</TableHead>
              <TableHead>Delivered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const creds = decryptCredentials(item.credentials);
              const credEntries = Object.entries(creds).filter(([, v]) => v);

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">
                    {item.uid ?? <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {item.productType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {credEntries.length > 0 ? (
                      <dl className="space-y-0.5 text-xs">
                        {credEntries.map(([key, val]) => (
                          <div key={key} className="flex gap-2">
                            <dt className="text-muted-foreground min-w-20">{key}:</dt>
                            <dd className="font-mono break-all">{val}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <span className="text-muted-foreground text-xs">No credentials</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.warrantyUntil ? (
                      <span className="flex items-center gap-1">
                        <ShieldCheckIcon className="size-3.5 text-green-500" />
                        {format(new Date(item.warrantyUntil), "dd/MM/yyyy")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(item.deliveredAt), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

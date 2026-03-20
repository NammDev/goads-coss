"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  updateWarrantyClaimStatus,
  linkReplacementItem,
} from "@/lib/actions/warranty-actions";
import type { WarrantyClaimWithItem } from "@/lib/db/queries/warranty-queries";

interface Props {
  claim: WarrantyClaimWithItem;
}

export function WarrantyClaimActions({ claim }: Props) {
  const [adminNote, setAdminNote] = useState(claim.adminNote ?? "");
  const [replacementId, setReplacementId] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isResolved =
    claim.status === "approved" ||
    claim.status === "rejected" ||
    claim.status === "replaced";

  function handleStatusUpdate(
    status: "approved" | "rejected",
  ) {
    startTransition(async () => {
      const result = await updateWarrantyClaimStatus(
        claim.id,
        status,
        adminNote || undefined,
      );
      if (result.success) {
        toast.success(`Claim ${status}`);
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleLinkReplacement() {
    if (!replacementId.trim()) {
      toast.error("Enter a replacement item ID");
      return;
    }
    startTransition(async () => {
      const result = await linkReplacementItem(claim.id, replacementId.trim());
      if (result.success) {
        toast.success("Replacement linked");
        setShowReplace(false);
        setReplacementId("");
      } else {
        toast.error(result.error);
      }
    });
  }

  if (isResolved && !showReplace) {
    return (
      <div className="flex gap-2">
        {claim.status === "approved" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReplace(true)}
            disabled={isPending}
          >
            Link Replacement
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-1">
      {!isResolved && (
        <div className="space-y-1.5">
          <Label htmlFor={`note-${claim.id}`} className="text-xs">
            Admin Note (optional)
          </Label>
          <Textarea
            id={`note-${claim.id}`}
            value={adminNote}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdminNote(e.target.value)}
            placeholder="Add a note for the customer..."
            rows={2}
            disabled={isPending}
          />
        </div>
      )}

      {showReplace && (
        <div className="space-y-1.5">
          <Label htmlFor={`replace-${claim.id}`} className="text-xs">
            Replacement Item ID
          </Label>
          <Input
            id={`replace-${claim.id}`}
            value={replacementId}
            onChange={(e) => setReplacementId(e.target.value)}
            placeholder="delivered item ID..."
            disabled={isPending}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!isResolved && (
          <>
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("approved")}
              disabled={isPending}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleStatusUpdate("rejected")}
              disabled={isPending}
            >
              Reject
            </Button>
          </>
        )}
        {showReplace && (
          <>
            <Button
              size="sm"
              onClick={handleLinkReplacement}
              disabled={isPending || !replacementId.trim()}
            >
              Confirm Replacement
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowReplace(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useTransition } from "react";
import { ShieldAlertIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitWarrantyClaim } from "@/lib/actions/warranty-actions";

interface Props {
  deliveredItemId: string;
  disabled?: boolean;
}

export function WarrantyClaimDialog({ deliveredItemId, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (reason.trim().length < 10) {
      toast.error("Reason must be at least 10 characters");
      return;
    }

    const formData = new FormData();
    formData.set("deliveredItemId", deliveredItemId);
    formData.set("reason", reason.trim());

    startTransition(async () => {
      const result = await submitWarrantyClaim(formData);
      if (result.success) {
        toast.success("Warranty claim submitted successfully");
        setOpen(false);
        setReason("");
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="gap-1.5"
        >
          <ShieldAlertIcon className="size-3.5" />
          Claim Warranty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Warranty Claim</DialogTitle>
          <DialogDescription>
            Describe the issue with your item. Our team will review your claim
            within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="reason">Reason</Label>
          <Textarea
            id="reason"
            placeholder="Describe the issue in detail (min. 10 characters)..."
            value={reason}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
            rows={4}
            disabled={isPending}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || reason.trim().length < 10}>
            {isPending ? "Submitting..." : "Submit Claim"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

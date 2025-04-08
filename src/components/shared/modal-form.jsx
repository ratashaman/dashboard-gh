"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ModalForm({
  title = "",
  description = "",
  submitLabel = "Simpan",
  open,
  onOpenChange,
  onSubmit,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {onSubmit ? (
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">{children}</div>
            <DialogFooter>
              <Button variant="secondary" type="submit">
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <>
            <div className="grid gap-4 py-4">{children}</div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  {submitLabel}
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

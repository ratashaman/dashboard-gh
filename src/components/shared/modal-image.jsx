"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ModalImage({ open, onOpenChange, image }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-svh">
        <DialogHeader>
          <DialogTitle>Bukti Pengaduan</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center h-svh pb-32">
          {image !== "" && (
            <div className="relative h-full w-full mt-10">
              <Image
                src={image}
                alt="attachment"
                fill
                sizes="2400px"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

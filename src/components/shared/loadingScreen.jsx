"use client";
import { LoaderIcon } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="bg-muted inset-0 w-scren h-screen flex justify-center items-center">
      <div className="bg-card p-4 rounded-md flex justify-center items-center">
        <LoaderIcon size={50} className="animate-spin" />
      </div>
    </div>
  );
}

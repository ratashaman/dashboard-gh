"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTableDemo } from "@/components/shared/data-table";

export default function KTPComponent() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">KTP</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <DataTableDemo />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

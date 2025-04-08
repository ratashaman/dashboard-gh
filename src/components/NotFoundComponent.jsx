"use client";

export default function NotFoundComponent() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tidak Ditemukan</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <div className="text-2xl">
          Halaman yang Anda cari tidak dapat ditemukan.
        </div>
      </div>
    </>
  );
}

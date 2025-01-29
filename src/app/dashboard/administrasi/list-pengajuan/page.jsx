"use client";

import { useState, useEffect } from "react";
import ListPengajuanComponent from "@/components/ListPengajuanComponent";

export default function ListPengajuanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPengajuan, setListPengajuan] = useState([]);

  const getPengajuan = async () => {
    // try {
    //   const { data } = await get("ktp/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        type: "Pembuatan Baru",
        category: "KTP",
        createdAt: "2025-01-06T22:17:01.142698Z",
        status: "Menunggu Verifikasi",
      },
      {
        type: "Pembuatan Baru",
        category: "Akta",
        createdAt: "2025-01-06T22:17:01.142698Z",
        status: "Menunggu Verifikasi",
      },
      {
        type: "Pembuatan Baru",
        category: "KTP",
        createdAt: "2025-01-06T22:17:01.142698Z",
        status: "Menunggu Verifikasi",
      },
      {
        type: "Pembuatan Baru",
        category: "KK",
        createdAt: "2025-01-06T22:17:01.142698Z",
        status: "Menunggu Verifikasi",
      },
      {
        type: "Pembuatan Baru",
        category: "Akta",
        createdAt: "2025-01-06T22:17:01.142698Z",
        status: "Menunggu Verifikasi",
      },
    ];
    setListPengajuan({ items: dummy });
  };

  const editPengajuan = async (id, payload) => {
    // try {
    //   const { data } = await put("ktp/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delPengajuan = async (id) => {
    // try {
    //   const { data } = await del("ktp/delete/" + id);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getPengajuan();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListPengajuanComponent
      {...{
        listPengajuan,
        isLoading,
        editPengajuan,
        delPengajuan,
      }}
    />
  );
}

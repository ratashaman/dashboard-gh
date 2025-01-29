"use client";

import { useState, useEffect } from "react";
import PerekrutComponent from "@/components/PerekrutComponent";

export default function PerekrutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPerekrut, setListPerekrut] = useState([]);

  const getPerekrut = async () => {
    // try {
    //   const { data } = await get("ktp/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        name: "PT. ABCD",
        description: "Deskripsi PT. ABCD",
        address: "Jalan ABCD No. 100, Garut, Jawa Barat",
      },
      {
        name: "PT. EFGH",
        description: "Deskripsi PT. EFGH",
        address: "Jalan EFGH No. 100, Garut, Jawa Barat",
      },
      {
        name: "PT. IJKL",
        description: "Deskripsi PT. IJKL",
        address: "Jalan IJKL No. 100, Garut, Jawa Barat",
      },
      {
        name: "PT. MNOP",
        description: "Deskripsi PT. MNOP",
        address: "Jalan MNOP No. 100, Garut, Jawa Barat",
      },
      {
        name: "PT. QRST",
        description: "Deskripsi PT. QRST",
        address: "Jalan QRST No. 100, Garut, Jawa Barat",
      },
    ];
    setListPerekrut({ items: dummy });
  };

  const editPerekrut = async (id, payload) => {
    // try {
    //   const { data } = await put("ktp/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delPerekrut = async (id) => {
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
      await getPerekrut();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <PerekrutComponent
      {...{
        listPerekrut,
        isLoading,
        editPerekrut,
        delPerekrut,
      }}
    />
  );
}

"use client";

import { useState, useEffect } from "react";
import KategoriComponent from "@/components/KategoriComponent";

export default function KategoriPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listKategori, setListKategori] = useState([]);

  const getKategori = async () => {
    // try {
    //   const { data } = await get("path");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        name: "Pajak",
        slug: "pajak",
      },
      {
        name: "Wisata",
        slug: "wisata",
      },
      {
        name: "Kuliner",
        slug: "kuliner",
      },
      {
        name: "Kriminal",
        slug: "kriminal",
      },
      {
        name: "Budaya",
        slug: "budaya",
      },
    ];
    setListKategori({ items: dummy });
  };

  const addKategori = async (payload) => {
    // try {
    //   const { data } = await post("path/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const editKategori = async (id, payload) => {
    // try {
    //   const { data } = await put("path/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delKategori = async (id) => {
    // try {
    //   const { data } = await del("path/" + id);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getKategori();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <KategoriComponent
      {...{
        listKategori,
        isLoading,
        addKategori,
        editKategori,
        delKategori,
      }}
    />
  );
}

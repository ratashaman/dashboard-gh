"use client";

import { useState, useEffect } from "react";
import KontenComponent from "@/components/KontenComponent";

export default function KontenPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listKonten, setListKonten] = useState([]);

  const getKonten = async () => {
    // try {
    //   const { data } = await get("path");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        title: "Pusat Kota Garut yang Makin Cantik Saja",
        category: "pajak",
        status: true,
      },
      {
        title:
          "Tempat Ngopi di Garut dengan Pemandangan City Light dan Gunung Cikuray",
        category: "wisata",
        status: false,
      },
      {
        title: "Menikmati Lezatnya Bakso Laksana yang Legendaris di Garut",
        category: "kuliner",
        status: true,
      },
      {
        title:
          "Ega Tewas Tersetrum Saat Amankan Benang Layangan Berkawat di Garut",
        category: "kriminal",
        status: true,
      },
      {
        title: "Stadion Legendaris di Garut yang Kini Berumput Sintetis",
        category: "budaya",
        status: true,
      },
    ];
    setListKonten({ items: dummy });
  };

  const addKonten = async (payload) => {
    // try {
    //   const { data } = await post("path/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const editKonten = async (id, payload) => {
    // try {
    //   const { data } = await put("path/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delKonten = async (id) => {
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
      await getKonten();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <KontenComponent
      {...{
        listKonten,
        isLoading,
        addKonten,
        editKonten,
        delKonten,
      }}
    />
  );
}

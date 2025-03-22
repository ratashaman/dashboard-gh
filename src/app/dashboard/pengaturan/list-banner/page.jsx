"use client";

import { useState, useEffect } from "react";
import ListBannerComponent from "@/components/ListBannerComponent";

export default function BannerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listBanner, setListBanner] = useState([]);

  const getBanner = async () => {
    // try {
    //   const { data } = await get("path");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        title: "Pusat Kota Garut yang Makin Cantik Saja",
        img: "/garut-land.jpeg",
        status: true,
      },
      {
        title:
          "Tempat Ngopi di Garut dengan Pemandangan City Light dan Gunung Cikuray",
        img: "/garut-land.jpeg",
        status: false,
      },
      {
        title: "Menikmati Lezatnya Bakso Laksana yang Legendaris di Garut",
        img: "/garut-land.jpeg",
        status: true,
      },
      {
        title:
          "Ega Tewas Tersetrum Saat Amankan Benang Layangan Berkawat di Garut",
        img: "/garut-land.jpeg",
        status: true,
      },
      {
        title: "Stadion Legendaris di Garut yang Kini Berumput Sintetis",
        img: "/garut-land.jpeg",
        status: true,
      },
    ];
    setListBanner({ items: dummy });
  };

  const addBanner = async (payload) => {
    // try {
    //   const { data } = await post("path/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const editBanner = async (id, payload) => {
    // try {
    //   const { data } = await put("path/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delBanner = async (id) => {
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
      await getBanner();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListBannerComponent
      {...{
        listBanner,
        isLoading,
        addBanner,
        editBanner,
        delBanner,
      }}
    />
  );
}

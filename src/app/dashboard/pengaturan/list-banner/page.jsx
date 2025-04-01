"use client";

import { useState, useEffect } from "react";
import { get, post, put, del } from "@/lib/services";
import { cl } from "@/lib/logger";
import ListBannerComponent from "@/components/ListBannerComponent";

export default function BannerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listBanner, setListBanner] = useState([]);

  const getBanner = async () => {
    try {
      const { data } = await get("cms-service/internals/banners", {
        page: -1,
      });
      cl(data);
      setListBanner(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const addBanner = async (payload) => {
    try {
      const { data } = await post("cms-service/internals/banners", payload);
      await getBanner();
      cl(data);
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const editBanner = async (id, payload) => {
    try {
      const { data } = await put(
        "cms-service/internals/banners/" + id,
        payload
      );
      await getBanner();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const delBanner = async (id) => {
    try {
      const { data } = await del("cms-service/internals/banners/" + id);
      await getBanner();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
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

"use client";

import { useState, useEffect } from "react";
import { get, post, put, del } from "@/lib/services";
import { cl } from "@/lib/logger";
import KatPengaduanComponent from "@/components/KatPengaduanComponent";

export default function KatPengaduanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listCat, setListCat] = useState([]);

  const getCat = async () => {
    try {
      const { data } = await get(
        "complaint-service/internals/complaint-types",
        {
          page: -1,
        }
      );
      cl(data);
      setListCat(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const addCat = async (payload) => {
    try {
      const { data } = await post(
        "complaint-service/internals/complaint-types",
        payload
      );
      await getCat();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const editCat = async (id, payload) => {
    try {
      const { data } = await put(
        "complaint-service/internals/complaint-types/" + id,
        payload
      );
      await getCat();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const delCat = async (id) => {
    try {
      const { data } = await del(
        "complaint-service/internals/complaint-types/" + id
      );
      await getCat();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getCat();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);
  return (
    <KatPengaduanComponent
      {...{ listCat, isLoading, addCat, editCat, delCat }}
    />
  );
}

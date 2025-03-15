"use client";

import { useState, useEffect } from "react";
import { get, put } from "@/lib/services";
import { cl } from "@/lib/logger";
import ListPengajuanKtpComponent from "@/components/ListPengajuanKtpComponent";

export default function ListPengajuanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPengajuan, setListPengajuan] = useState([]);

  const getPengajuan = async () => {
    try {
      const { data } = await get("resident-service/internals/id-cards", {
        page: -1,
      });
      cl(data);
      setListPengajuan(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const editPengajuan = async (id, payload) => {
    try {
      const { data } = await put(
        "resident-service/internals/id-cards/" + id + "/status",
        payload
      );
      cl(data);
    } catch (error) {
      cl(error);
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getPengajuan();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListPengajuanKtpComponent
      {...{
        listPengajuan,
        isLoading,
        editPengajuan,
      }}
    />
  );
}

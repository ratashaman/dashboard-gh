"use client";

import { useState, useEffect } from "react";
import ListPengajuanKtp from "@/components/ListPengajuanKtp";

export default function KTPPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPengajuanKtp, setListPengajuanKtp] = useState([]);

  const getListPengajuanKtp = async () => {
    // try {
    //   const { data } = await get("ktp/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const addPengajuanKtp = async (payload) => {
    // try {
    //   const { data } = await post("ktp/add", payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const editPengajuanKtp = async (id, payload) => {
    // try {
    //   const { data } = await put("ktp/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const delPengajuanKtp = async (id) => {
    // try {
    //   const { data } = await del("ktp/delete/" + id);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getListPengajuanKtp();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListPengajuanKtp
      listPengajuanKtp={listPengajuanKtp}
      isLoading={isLoading}
      addPengajuanKtp={addPengajuanKtp}
      editPengajuanKtp={editPengajuanKtp}
      delPengajuanKtp={delPengajuanKtp}
    />
  );
}

"use client";

import { useState, useEffect } from "react";
import ListPengajuanKk from "@/components/ListPengajuanKk";

export default function RingkasanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPengajuanKk, setListPengajuanKk] = useState([]);

  const getListPengajuanKk = async () => {
    // try {
    //   const { data } = await get("kk/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const addPengajuanKk = async (payload) => {
    // try {
    //   const { data } = await post("kk/add", payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const editPengajuanKk = async (id, payload) => {
    // try {
    //   const { data } = await put("kk/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  const delPengajuanKk = async (id) => {
    // try {
    //   const { data } = await del("kk/del/" + id);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getListPengajuanKk();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListPengajuanKk
      listPengajuanKk={listPengajuanKk}
      isLoading={isLoading}
      addPengajuanKk={addPengajuanKk}
      editPengajuanKk={editPengajuanKk}
      delPengajuanKk={delPengajuanKk}
    />
  );
}


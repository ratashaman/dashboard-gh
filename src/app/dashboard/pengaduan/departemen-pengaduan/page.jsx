"use client";

import { useState, useEffect } from "react";
import { get, post, put, del } from "@/lib/services";
import { cl } from "@/lib/logger";
import DeptPengaduanComponent from "@/components/DeptPengaduanComponent";

export default function DeptPengaduanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listDept, setListDept] = useState([]);

  const getDept = async () => {
    try {
      const { data } = await get("complaint-service/internals/departments", {
        page: -1,
      });
      cl(data);
      setListDept(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const addDept = async (payload) => {
    try {
      const { data } = await post(
        "complaint-service/internals/departments",
        payload
      );
      await getDept();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const editDept = async (id, payload) => {
    try {
      const { data } = await put(
        "complaint-service/internals/departments/" + id,
        payload
      );
      await getDept();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const delDept = async (id) => {
    try {
      const { data } = await del(
        "complaint-service/internals/departments/" + id
      );
      await getDept();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getDept();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);
  return (
    <DeptPengaduanComponent
      {...{ listDept, isLoading, addDept, editDept, delDept }}
    />
  );
}

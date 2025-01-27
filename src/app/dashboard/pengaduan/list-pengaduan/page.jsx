"use client";

import { useState, useEffect } from "react";
import { get, put, del } from "@/lib/services";
import { cl } from "@/lib/logger";
import ListPengaduanComponent from "@/components/ListPengaduanComponent";

export default function ListPengaduanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listComplaint, setListComplaint] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listType, setListType] = useState([]);

  const getComplaint = async () => {
    try {
      const { data } = await get("complaint-service/internals/complaints");
      cl(data);
      setListComplaint(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const getDepartment = async () => {
    try {
      const { data } = await get("complaint-service/internals/departments");
      cl(data);
      const reformatList = data.data.items.map((item) => {
        return { value: item.id, label: item.name };
      });
      setListDepartment(reformatList);
    } catch (error) {
      cl(error);
    }
  };

  const getType = async () => {
    try {
      const { data } = await get("complaint-service/internals/complaint-types");
      cl(data);
      const reformatList = data.data.items.map((item) => {
        return { value: item.id, label: item.name };
      });
      setListType(reformatList);
    } catch (error) {
      cl(error);
    }
  };

  const editComplaint = async (id, payload) => {
    try {
      const { data } = await put(
        "complaint-service/internals/complaints/" + id,
        payload
      );
      await getComplaint();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const editStatus = async (id, payload) => {
    try {
      const { data } = await put(
        "complaint-service/internals/complaints/" + id + "/status",
        payload
      );
      await getComplaint();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const delComplaint = async (id) => {
    try {
      const { data } = await del(
        "complaint-service/internals/complaints/" + id
      );
      await getComplaint();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getComplaint();
      await getDepartment();
      await getType();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);
  return (
    <ListPengaduanComponent
      {...{
        listComplaint,
        listDepartment,
        listType,
        isLoading,
        editComplaint,
        editStatus,
        delComplaint,
      }}
    />
  );
}

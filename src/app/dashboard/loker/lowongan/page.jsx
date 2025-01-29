"use client";

import { useState, useEffect } from "react";
import LowonganComponent from "@/components/LowonganComponent";

export default function LowonganPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listLowongan, setListLowongan] = useState([]);

  const getLowongan = async () => {
    // try {
    //   const { data } = await get("ktp/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        position: "Sales",
        recruiter: "PT. ABCD",
        status: true,
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        position: "Engineer",
        recruiter: "PT. ABCD",
        status: false,
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        position: "Admin",
        recruiter: "PT. ABCD",
        status: true,
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        position: "Manager",
        recruiter: "PT. ABCD",
        status: true,
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        position: "Supervisor",
        recruiter: "PT. ABCD",
        status: true,
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
    ];
    setListLowongan({ items: dummy });
  };

  const editLowongan = async (id, payload) => {
    // try {
    //   const { data } = await put("ktp/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delLowongan = async (id) => {
    // try {
    //   const { data } = await del("ktp/delete/" + id);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getLowongan();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <LowonganComponent
      {...{
        listLowongan,
        isLoading,
        editLowongan,
        delLowongan,
      }}
    />
  );
}

"use client";

import { useState, useEffect } from "react";
import LamaranComponent from "@/components/LamaranComponent";

export default function LamaranPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listLamaran, setListLamaran] = useState([]);

  const getLamaran = async () => {
    // try {
    //   const { data } = await get("ktp/list");
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    const dummy = [
      {
        name: "Nama Pelamar 1",
        position: "Sales",
        recruiter: "PT. ABCD",
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        name: "Nama Pelamar 2",
        position: "Engineer",
        recruiter: "PT. ABCD",
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        name: "Nama Pelamar 3",
        position: "Admin",
        recruiter: "PT. ABCD",
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        name: "Nama Pelamar 4",
        position: "Manager",
        recruiter: "PT. ABCD",
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
      {
        name: "Nama Pelamar 5",
        position: "Supervisor",
        recruiter: "PT. ABCD",
        createdAt: "2025-01-06T22:17:01.142698Z",
      },
    ];
    setListLamaran({ items: dummy });
  };

  const editLamaran = async (id, payload) => {
    // try {
    //   const { data } = await put("ktp/edit/" + id, payload);
    //   cl(data);
    // } catch (error) {
    //   cl(error);
    // }
    return { status: "OK" };
  };

  const delLamaran = async (id) => {
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
      await getLamaran();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <LamaranComponent
      {...{
        listLamaran,
        isLoading,
        editLamaran,
        delLamaran,
      }}
    />
  );
}

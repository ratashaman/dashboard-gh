"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/services";
import { cl } from "@/lib/logger";
import ListPenggunaComponent from "@/components/ListPenggunaComponent";

export default function ListPenggunaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [listRole, setListRole] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await get("user-management/internal/users");
      cl(data);
      setListUser(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const getRole = async () => {
    try {
      const { data } = await get("user-management/internal/roles");
      cl(data);
      setListRole(data.data.items);
    } catch (error) {
      cl(error);
    }
  };

  const addUser = async (payload) => {
    try {
      const { data } = await post(
        "user-management/authentication/signin",
        payload
      );
      cl(data);
    } catch (error) {
      cl(error);
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getUser();
      await getRole();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);
  return (
    <ListPenggunaComponent {...{ listUser, listRole, isLoading, addUser }} />
  );
}

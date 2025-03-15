"use client";

import { useState, useEffect } from "react";
import { get, post, put, del } from "@/lib/services";
import { cl } from "@/lib/logger";
import ListPenggunaComponent from "@/components/ListPenggunaComponent";

export default function ListPenggunaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [listRole, setListRole] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await get("user-management/internal/users", {
        page: -1,
      });
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
      const reformatList = data.data.items.map((item) => {
        return { value: item.id, label: item.name };
      });
      setListRole(reformatList);
    } catch (error) {
      cl(error);
    }
  };

  const addUser = async (payload) => {
    try {
      const { data } = await post("user-management/internal/users", payload);
      await getUser();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const editUser = async (id, payload) => {
    try {
      const { data } = await put(
        "user-management/internal/users/" + id,
        payload
      );
      await getUser();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const delUser = async (id) => {
    try {
      const { data } = await del("user-management/internal/users/" + id);
      await getUser();
      return data;
    } catch (error) {
      cl(error);
      throw error;
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
    <ListPenggunaComponent
      {...{ listUser, listRole, isLoading, addUser, editUser, delUser }}
    />
  );
}

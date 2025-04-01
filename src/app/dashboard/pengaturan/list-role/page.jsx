"use client";

import { useState, useEffect } from "react";
import { get, post, put, del } from "@/lib/services";
import { cl } from "@/lib/logger";
import ListRoleComponent from "@/components/ListRoleComponent";

export default function RolePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listRole, setListRole] = useState([]);

  const getRole = async () => {
    try {
      const { data } = await get("user-management/internal/roles", {
        page: -1,
      });
      cl(data);
      setListRole(data.data);
    } catch (error) {
      cl(error);
    }
  };

  const addRole = async (payload) => {
    try {
      const { data } = await post("user-management/internal/roles", payload);
      await getRole();
      cl(data);
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const editRole = async (id, payload) => {
    try {
      const { data } = await put(
        "user-management/internal/roles/" + id,
        payload
      );
      await getRole();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  const delRole = async (id) => {
    try {
      const { data } = await del("user-management/internal/roles/" + id);
      await getRole();
      return data;
    } catch (error) {
      cl(error);
      throw error;
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getRole();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <ListRoleComponent
      {...{
        listRole,
        isLoading,
        addRole,
        editRole,
        delRole,
      }}
    />
  );
}

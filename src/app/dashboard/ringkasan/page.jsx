"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/services";
import { cl } from "@/lib/logger";
import RingkasanComponent from "@/components/RingkasanComponent";
import { useUserStore } from "@/store";

export default function RingkasanPage() {
  const { users } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPengajuan, setTotalPengajuan] = useState(0);
  const [totalComplaint, setTotalComplaint] = useState(0);
  const [totalLamaran, setTotalLamaran] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const checkRole = (roles = []) => {
    if (users?.roles?.length) {
      return users.roles.some((role) => roles.includes(role.systemName));
    } else {
      return false;
    }
  };

  const getPengajuan = async () => {
    try {
      const { data } = await get("resident-service/internals/id-cards", {
        page: -1,
        itemPerPage: -1,
      });
      cl(data);
      setTotalPengajuan(data.data?.total);
    } catch (error) {
      cl(error);
    }
  };

  const getComplaint = async () => {
    try {
      const { data } = await get("complaint-service/internals/complaints", {
        page: -1,
        itemPerPage: -1,
      });
      cl(data);
      setTotalComplaint(data.data?.total);
    } catch (error) {
      cl(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await get("user-management/internal/users", {
        page: -1,
        itemPerPage: -1,
      });
      cl(data);
      setTotalUser(data.data?.total);
    } catch (error) {
      cl(error);
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      if (checkRole(["admin", "superadmin", "complaint"])) await getComplaint();
      if (checkRole(["admin", "superadmin"])) await getPengajuan();
      if (checkRole(["admin", "superadmin"])) await getUser();
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <RingkasanComponent
      {...{
        totalPengajuan,
        totalComplaint,
        isLoading,
        totalLamaran,
        totalUser,
      }}
    />
  );
}

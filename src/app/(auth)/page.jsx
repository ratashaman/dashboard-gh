"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/services";
import { cl } from "@/lib/logger";
import { setStorages } from "@/lib/storage";
import LoginComponent from "@/components/LoginComponent";

export default function LoginPage() {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async (email, password) => {
    setErrMessage("");
    try {
      const { data } = await post("user-management/authentication/signin", {
        email,
        password,
      });
      cl(data);
      setStorages([
        { name: "accessToken", value: data.data.accessToken },
        { name: "refreshToken", value: data.data.refreshToken },
      ]);
      router.push("/dashboard/ringkasan");
    } catch (error) {
      cl(error);
      setErrMessage(error?.message);
    }
  };

  return <LoginComponent handleLogin={handleLogin} errMessage={errMessage} />;
}

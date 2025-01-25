"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/services";
import { cl } from "@/lib/logger";
import { setStorages } from "@/lib/storage";
import { validateEmail } from "@/lib/utils";
import LoginComponent from "@/components/LoginComponent";

export default function LoginPage() {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!validateEmail(email)) {
      return setErrMessage(
        "Format email tidak sesuai, silakan periksa kembali"
      );
    }

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
      setErrMessage(
        error?.message ||
          "Terjadi kesalahan, silakan coba kembali beberapa saat"
      );
    }
  };

  return (
    <LoginComponent
      handleLogin={handleLogin}
      setErrMessage={setErrMessage}
      errMessage={errMessage}
    />
  );
}

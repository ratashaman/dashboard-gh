"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { Label } from "@/components/ui/label";

export default function LoginComponent({
  handleLogin,
  setErrMessage,
  errMessage,
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-6">
                <img
                  src="/logo-garut-hebat-ori.svg"
                  alt="Image"
                  className="w-1/2 md:w-1/3 dark:brightness-[0.2] dark:grayscale"
                />
                <h1 className="text-2xl font-bold text-primary">
                  Dashboard Garut Hebat
                </h1>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Masukkan alamat email</Label>
                <Input
                  onChange={(e) => setErrMessage("")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Masukkan password</Label>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <PasswordInput
                  onChange={(e) => setErrMessage("")}
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Password"
                  required
                />
              </div>
              {errMessage !== "" && (
                <div className="p-2 rounded-md text-center border border-destructive-foreground text-destructive">
                  {errMessage}
                </div>
              )}
              <Button
                type="submit"
                variant="secondary"
                className="w-full font-bold"
              >
                Masuk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

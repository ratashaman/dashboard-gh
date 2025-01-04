import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginComponent({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-6">
                <img
                  src="/joyful-garut.png"
                  alt="Image"
                  className="w-1/2 md:w-1/3 dark:brightness-[0.2] dark:grayscale"
                />
                <h1 className="text-2xl font-bold text-secondary">
                  Dashboard Garut Hebat
                </h1>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Masukkan alamat email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Masukkan password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Link
                href="/ringkasan"
                className="w-full"
                passHref
                legacyBehavior
              >
                <Button type="submit" className="w-full font-bold">
                  Masuk
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

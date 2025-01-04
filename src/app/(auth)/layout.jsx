import { Lexend } from "next/font/google";
import "@/styles/globals.css";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard Garut Hebat",
  description: "Selamat datang di dashboard Garut Hebat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexendSans.className} antialiased`}>
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-xl">{children}</div>
        </div>
      </body>
    </html>
  );
}

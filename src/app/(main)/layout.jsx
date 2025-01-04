import { Lexend } from "next/font/google";
import "@/styles/globals.css";
import LayoutComponent from "@/components/LayoutComponent";

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
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}

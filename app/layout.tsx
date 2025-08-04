import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RootProvider from "@/core/providers/RootProvider/RootProvider";
import HomeLayout from "@/core/layouts/Home";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fitness Gym - HulkGains",
  description: "A modern fitness gym website ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${poppins.className} sans-serif bg-black/90 text-black dark:text-white/90`}>
        <RootProvider>
          <HomeLayout>{children}</HomeLayout>
        </RootProvider>
      </body>
    </html>
  );
}

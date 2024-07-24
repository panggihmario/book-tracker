import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationBar from "@/components/container/navigation";
import AuthContextProvider from "@/context/authContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <NavigationBar></NavigationBar>
          <>
          {children}
          </>
        </AuthContextProvider>
       
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import DashboardWrapper from "./DashboardWrapper";
import { Suspense } from "react";
import Loading from "../loading";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalStock",
  description: "Personal item invetory",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const session = await auth()
  console.log(!session?.expires)
  if (!session?.expires) {
    redirect('/login');
  } else {
  return (
    <DashboardWrapper>
        {children}
      </DashboardWrapper>
  );
  }
}

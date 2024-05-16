import React from 'react';
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-[75px]">
        <Header />
      </div>
      <main className="h-[calc(100%-125px)]">{children}</main>
      <div className="w-full h-[50px]">
        <Footer />
      </div>
    </>
  );
}

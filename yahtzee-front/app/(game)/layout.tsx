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
      <main className="h-[calc(100%-150px)]">{children}</main>
      <div className="w-full h-[75px]">
        <Footer />
      </div>
    </>
  );
}

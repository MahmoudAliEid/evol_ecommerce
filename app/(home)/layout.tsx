import Header from "@/components/shared/header/header";
import React from "react";
const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col   min-h-screen">
      <Header />
      <main className="flex flex-1 flex-col min-h[120svh]"> {children}</main>
    </div>
  );
};

export default HomeLayout;

import Image from "next/image";
import React from "react";

import LeftSidebar from "@/components/navigation/LeftSidebar";
import MobileNavbar from "@/components/navigation/MobileNavbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = { firstName: "Danai", lastName: "Wee" };

  return (
    <main className="flex h-screen w-full font-inter">
      <LeftSidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNavbar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;

import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import LeftSidebar from "@/components/navigation/LeftSidebar";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import { ROUTES } from "@/constants/routes";
import { getLoggedInUser } from "@/lib/actions/user.action";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) redirect(ROUTES.SIGN_IN);

  return (
    <main className="flex h-screen w-full font-inter">
      <LeftSidebar user={user} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNavbar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;

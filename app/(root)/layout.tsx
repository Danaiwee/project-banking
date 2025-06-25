import React from "react";

import LeftSidebar from "@/components/navigation/LeftSidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = { firstName: "Danai", lastName: "Wee" };

  return (
    <main className='flex h-screen w-full font-inter'>
      <LeftSidebar user={loggedIn} />
      {children}
    </main>
  );
};

export default RootLayout;

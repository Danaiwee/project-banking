"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { logOutAccount } from "@/lib/actions/user.action";
import { cn } from "@/lib/utils";

interface FooterProps {
  user: User | null;
  type?: "desktop" | "mobile";
}

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logOutAccount();

    if (loggedOut) router.push(ROUTES.SIGN_IN);
  };

  return (
    <footer className={cn(type === "mobile" ? "footer_mobile" : "footer")}>
      <div
        className={cn(type === "mobile" ? "footer_name-mobile" : "footer_name")}
      >
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>

      <div
        className={cn(
          type === "mobile" ? "footer_email-mobile" : "footer_email"
        )}
      >
        <h1 className="text-[14px] truncate text-gray-700 font-semibold">
          {user?.name}
        </h1>
        <p className="text-[12px] truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogout}>
        <Image src="/icons/logout.svg" fill alt="Logout icon" />
      </div>
    </footer>
  );
};

export default Footer;

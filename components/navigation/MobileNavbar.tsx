"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="Menu icon"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetTitle className="hidden">Mobile Navigation</SheetTitle>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-2 px-4 mt-5"
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Next Bank logo"
            />
            <h1 className="mobile-logo">Next</h1>
          </Link>

          <div className="mobile-nav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose key={item.label} asChild>
                      <Link
                        href={item.route}
                        className={cn("mobile-sheet_close w-full", {
                          "bg-blue-400": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          width={20}
                          height={20}
                          alt={item.label}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-[16px] font-semibold text-gray-700",
                            { "!text-white": isActive }
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>
            FOOTER
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;

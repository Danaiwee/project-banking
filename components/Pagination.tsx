"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { formUrlQuery } from "@/lib/url";

import { Button } from "./ui/button";

interface PaginationProps {
  totalPages: string | number;
  page: string | number;
}

const Pagination = ({ totalPages, page = 1 }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (type: "prev" | "next") => {
    const pageNumber = type === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-between gap-3">
      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="mr-2"
        />
        Prev
      </Button>

      <p className="text-[14px] flex items-center px-2">
        {page} / {totalPages}
      </p>

      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => handleNavigation("next")}
        disabled={Number(page) === totalPages}
      >
        Next
        <Image
          src="/icons/arrow-right.svg"
          alt="arrow"
          width={20}
          height={20}
          className="mr-2"
        />
      </Button>
    </div>
  );
};

export default Pagination;

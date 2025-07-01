"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

interface BankTabItemProps {
  account: Account;
  appwriteItemId: string;
}

const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className={cn(`banktab-item`, { "border-blue-600": isActive })}
      onClick={handleBankChange}
    >
      <p
        className={cn(
          `text-[16px] line-clamp-1 flex-1 font-medium texet-gray-500`,
          {
            "text-blue-600": isActive,
          }
        )}
      >
        {account.name}
      </p>
    </div>
  );
};

export default BankTabItem;

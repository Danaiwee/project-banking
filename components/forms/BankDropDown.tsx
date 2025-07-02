"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { formUrlQuery } from "@/lib/url";
import { formatAmount } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";

interface BankDropDownProps {
  accounts: Account[] | [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  otherStyles?: string;
}

const BankDropDown = ({
  accounts = [],
  setValue,
  otherStyles,
}: BankDropDownProps) => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(accounts[0] || []);
  const router = useRouter();

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id);

    if (!account) return;

    setSelected(account);

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });

    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("senderBank", id);
    }
  };

  return (
    <Select
      defaultValue={selected?.id}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger
        className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}
      >
        <Image
          src="/icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent
        className={`w-full bg-white md:w-[300px] ${otherStyles}`}
        align="end"
      >
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
            Select a bank to display
          </SelectLabel>
          {accounts &&
            accounts.map((account: Account) => (
              <SelectItem
                key={account?.id}
                value={account?.appwriteItemId}
                className="cursor-pointer"
              >
                <div className="flex flex-col">
                  <p className="text-[16px] font-medium">{account?.name}</p>
                  <p className="text-[14px] font-medium text-blue-600">
                    {formatAmount(account.currentBalance)}
                  </p>
                </div>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BankDropDown;

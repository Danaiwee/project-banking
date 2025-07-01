import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { formatAmount } from "@/lib/utils";

import Copy from "./Copy";

interface BankCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

const BankCard = ({ account, userName, showBalance = true }: BankCardProps) => {
  const { mask, shareableId, appwriteItemId } = account;  
  return (
    <div className="flex flex-col">
      <Link
        href={ROUTES.TRANSACTION_HISTORY(appwriteItemId)}
        className="bank-card"
      >
        <div className="bank-card_content">
          <div>
            <h1 className="text-[16px] font-semibold text-white">
              {account.name || userName}
            </h1>
            <p className="font-IBMPlexSerif font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-[12px] font-semibold text-white">
                {userName}
              </h1>
              <h2 className="text-[10px] font-semibold text-white">●●/●●</h2>
            </div>
            <p className="text-[10px] font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●
              <span className="text-[10px]">&nbsp;{mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="Pay icon"
          />

          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0"
        />
      </Link>

      {showBalance && <Copy title={shareableId} />}
    </div>
  );
};

export default BankCard;

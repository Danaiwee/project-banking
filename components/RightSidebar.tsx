import Image from "next/image";
import Link from "next/link";

import BankCard from "./BankCard";

interface RightSidebarProps {
  user: User | null;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className="right-sidebar noscrollbar">
      <section className="flex flex-col pb-8 text-indigo-500">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-image">
            <span className="text-5xl font-bold text-blue-500">
              {user?.name[0] || ""}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{user?.name || "Guest"}</h1>
            <p className="profile-email">{user?.email || ""}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-1">
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="Plus icon"
              className="size-5"
            />
            <h2 className="text-[14px] font-semibold textgray-600">Add Bank</h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user?.name}`}
                showBalance={false}
              />

              {banks[1] && (
                <div className="absolute right-0 top-8 -z-10 w-[90%]">
                  <BankCard
                    key={banks[1].$id}
                    account={banks[1]}
                    userName={`${user?.name}`}
                    showBalance={false}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;

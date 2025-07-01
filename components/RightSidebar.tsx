import Image from "next/image";
import Link from "next/link";

import BankCard from "./BankCard";

interface RightSidebarProps {
  user: User | null;
  transactions: Transaction[];
  banks: Bank[] & Account[];
  accounts: Account[];
}

const RightSidebar = ({
  user,
  transactions,
  banks,
  accounts,
}: RightSidebarProps) => {
  return (
    <aside className="right-sidebar noscrollbar">
      <section className="flex flex-col pb-8 text-indigo-500">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-image">
            <span className="text-5xl font-bold text-blue-500">
              {user?.firstName[0] || ""}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {`${user?.firstName} ${user?.lastName}` || "Guest"}
            </h1>
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
          <div className="flex flex-col gap-2">
            {accounts?.map((account: Account) => {
              return (
                <div
                  className={`w-full relative`}
                  key={account.id}
                >
                  <BankCard
                    key={account.id}
                    account={account}
                    userName={`${user?.firstName} ${user?.lastName}`}
                    showBalance={false}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;

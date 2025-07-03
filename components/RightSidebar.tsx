import { TRANSACTIONS } from "@/constants";
import { countTransactionsCategory } from "@/lib/utils";

import BankCard from "./BankCard";
import Category from "./Category";
import PlaidLink from "./plaid/PlaidLink";

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
  const categories: CategoryCounts[] = countTransactionsCategory(transactions);
  return (
    <aside className="right-sidebar">
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
        <div className="flex w-full justify-between items-center">
          <h2 className="header-2">My Banks</h2>
          <PlaidLink user={user} isRightSidebar />
        </div>

        {banks?.length > 0 && (
          <div className="flex flex-col gap-2">
            {accounts?.map((account: Account) => {
              return (
                <div className={`w-full relative`} key={account.id}>
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

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top Categories</h2>

          <div className="space-y-5">
            {categories.map((category: CategoryCounts) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;

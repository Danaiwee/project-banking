import Link from "next/link";

import { TRANSACTIONS } from "@/constants";
import { ROUTES } from "@/constants/routes";

import BankInfo from "./BankInfo";
import BankTabItem from "./BankTabItem";
import TransactionsTable from "./TransactionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface RecentTransactionProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

const RecentTransaction = ({
  accounts,
  transactions,
  appwriteItemId,
  page,
}: RecentTransactionProps) => {
  return (
    <section className="recent-transactions">
      <header className="flex-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={ROUTES.TRANSACTION_HISTORY(appwriteItemId)}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger
              key={account.id}
              value={account.appwriteItemId}
              className="py-7"
            >
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            key={account.id}
            value={account.appwriteItemId}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <TransactionsTable transactions={TRANSACTIONS} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransaction;

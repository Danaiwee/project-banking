import Link from "next/link";

import { ROUTES } from "@/constants/routes";

import BankInfo from "./BankInfo";
import BankTabItem from "./BankTabItem";
import TransactionsTable from "./TransactionsTable";
import Pagination from "../Pagination";
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
  const dataPerPage = 10;
  const totalPages = Math.ceil(transactions.length / dataPerPage);

  const indexOfLastTrasactions = page * dataPerPage;
  const indexOfFirstTransactions = indexOfLastTrasactions - dataPerPage;

  const currentTrnsactions = transactions.slice(
    indexOfFirstTransactions,
    indexOfLastTrasactions
  );

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
        <TabsList className="recent-transactions-tablist custom-scrollbar">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
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

            <TransactionsTable transactions={currentTrnsactions} />
          </TabsContent>
        ))}

        <Pagination totalPages={totalPages} page={page} />
      </Tabs>
    </section>
  );
};

export default RecentTransaction;

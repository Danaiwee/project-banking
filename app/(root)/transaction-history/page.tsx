import { redirect } from "next/navigation";

import Header from "@/components/header/Header";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { ROUTES } from "@/constants/routes";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { formatAmount } from "@/lib/utils";

const HistoryPage = async ({ searchParams }: RouteParams) => {
  const { id, page } = await searchParams;

  const currentPage = Number(page) || 1;
  const user = await getLoggedInUser();
  if (!user) redirect(ROUTES.SIGN_IN);

  const accounts = await getAccounts({ userId: user.$id });
  if (!accounts) return null;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  const { name, officialName, mask, currentBalance } = account.data;
  const transactions = account.transactions;

  return (
    <div className="transactions">
      <div className="transactions-header">
        <Header
          title="Transaction History"
          description="See your bank details and transactions"
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-[18px] font-bold text-white">{name}</h2>
            <p className="text-[14px] text-blue-25">{officialName}</p>
            <p className="text-[14px] font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-[14px]">Current balance</p>
            <p className="text-[24px] text-center font-bold">
              {formatAmount(currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={transactions} />
        </section>
      </div>
    </div>
  );
};

export default HistoryPage;

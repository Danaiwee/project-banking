import { redirect } from "next/navigation";

import Header from "@/components/header/Header";
import TotalBalanceBox from "@/components/header/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import RecentTransaction from "@/components/transactions/RecentTransaction";
import { TRANSACTIONS } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";

export default async function HomePage({ searchParams }: RouteParams) {
  const { id, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const user = await getLoggedInUser();
  if (!user) redirect(ROUTES.SIGN_IN);

  const accounts = await getAccounts({ userId: user.$id });
  if (!accounts) return null;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  // const account = await getAccount({ appwriteItemId });
  
  return (
    <section className="home no-scrollbar">
      <div className="home-content no-scrollbar">
        <header className="home-header">
          <Header
            type="greeting"
            title="Welcome"
            user={user?.firstName || "Guest"}
            description="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>

        <RecentTransaction
          accounts={accountsData}
          transactions={TRANSACTIONS}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={user}
        transactions={[]}
        banks={accountsData?.slice(0, 2)}
        accounts={accountsData}
      />
    </section>
  );
}

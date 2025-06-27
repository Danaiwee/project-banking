import { redirect } from "next/navigation";

import Header from "@/components/header/Header";
import TotalBalanceBox from "@/components/header/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { ROUTES } from "@/constants/routes";
import { getLoggedInUser } from "@/lib/actions/user.action";

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect(ROUTES.SIGN_IN);

  return (
    <section className="home no-scrollbar">
      <div className="home-content no-scrollbar">
        <header className="home-header">
          <Header
            type="greeting"
            title="Welcome"
            user={user?.name || "Guest"}
            description="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={3759.33}
          />
        </header>
        RECENT TRANSACTION
      </div>

      <RightSidebar
        user={user}
        transactions={[]}
        banks={[{ currentBalance: 3750.0 }, { currentBalance: 1270.55 }]}
      />
    </section>
  );
}

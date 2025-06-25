import Header from "@/components/header/Header";
import TotalBalanceBox from "@/components/header/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

export default function HomePage() {
  const loggedIn = {
    firstName: "Danai",
    lastName: "Weerayutwattana",
    email: "danai.weerayut@gmail.com",
  };

  return (
    <section className="home no-scrollbar">
      <div className="home-content no-scrollbar">
        <header className="home-header">
          <Header
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstname || "Guest"}
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
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 3750.0 }, { currentBalance: 1270.55 }]}
      />
    </section>
  );
}

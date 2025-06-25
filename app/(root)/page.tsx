import Header from "@/components/header/Header";
import TotalBalanceBox from "@/components/header/TotalBalanceBox";

export default function HomePage() {
  const loggedIn = { firstname: "Danai" };

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
      </div>
    </section>
  );
}

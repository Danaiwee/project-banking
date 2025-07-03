import { Metadata } from "next";
import React from "react";

import BankCard from "@/components/BankCard";
import Header from "@/components/header/Header";
import { getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";

export const metadata: Metadata = {
  title: "Next Bank | My Banks",
  description:
    "View all your linked credit and debit cards in one place with Next Banking. Manage balances, card details, and transactions with ease and security.",
};

const MyBankPage = async () => {
  const user = await getLoggedInUser();
  const accounts = await getAccounts({ userId: user.$id });

  return (
    <section className="flex">
      <div className="my-banks">
        <Header
          title="My Bank Accounts"
          description="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>

          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account: Account) => (
                <BankCard
                  account={account}
                  key={account.id}
                  userName={account.name}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBankPage;

import { redirect } from "next/navigation";

import PaymentForm from "@/components/forms/PaymentForm";
import Header from "@/components/header/Header";
import { ROUTES } from "@/constants/routes";
import { getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";

const PaymentPage = async () => {
  const user = await getLoggedInUser();
  const accounts = await getAccounts({ userId: user.$id });
  if (!accounts) redirect(ROUTES.SIGN_IN);

  const accountsData = accounts.data;
  return (
    <section className="payment-transfer">
      <Header
        title="Payment Transfer"
        description="Please provide any specific details of notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentForm accounts={accountsData} />
      </section>
    </section>
  );
};

export default PaymentPage;

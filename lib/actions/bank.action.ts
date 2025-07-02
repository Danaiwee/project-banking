"use server";

import { CountryCode } from "plaid";

import { getBank, getBanks } from "./user.action";
import handleError from "../handlers/error";
import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";
import { getTransactionByBankId } from "./transaction.action";

export async function getInstitution({ institutionId }: InstitutionParams) {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const institution = institutionResponse.data.institution;

    return parseStringify(institution);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTransactions({ accessToken }: GetTransactionsParams) {
  let hasMore = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getAccounts({ userId }: GetAccountsParams) {
  try {
    const banks = await getBanks({ userId });

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        const accountResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });

        const accountData = accountResponse.data.accounts[0];

        const institution = await getInstitution({
          institutionId: accountResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          shareableId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getAccount({ appwriteItemId }: GetAccountParams) {
  try {
    const bank = await getBank({ documentId: appwriteItemId });

    const accountResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });

    const accountData = accountResponse.data.accounts[0];

    const transferTransactionsData = await getTransactionByBankId({
      bankId: bank.$id,
    });

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );

    const institution = await getInstitution({
      institutionId: accountResponse.data.item.institution_id!,
    });

    // This is Plaid's sample transactions
    // const transactions = await getTransactions({
    //   accessToken: bank?.accessToken,
    // });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // This is the combination between real transactions and mock up transactions
    // const allTransactions = [...transactions].sort(
    //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    // );

    return parseStringify({
      data: account,
      transactions: transferTransactions,
    });
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

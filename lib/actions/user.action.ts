"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { ROUTES } from "@/constants/routes";

import { createAdminClient, createSessionClient } from "../appwrite";
import handleError from "../handlers/error";
import logger from "../logger";
import { plaidClient } from "../plaid";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { addFundingSource, createDwollaCustomer } from "./dwolla.action";
import { NotFoundError } from "../http-error";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export async function getUserInfo({ userId }: GetUserInfoParams) {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    if (!user) throw new NotFoundError("User");

    return parseStringify(user.documents[0]);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function signIn(userData: SignInParams) {
  const { email, password } = userData;

  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function signUp({ password, ...userData }: SignupParams) {
  const { email, firstName, lastName } = userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    if (!newUserAccount) throw new Error("Error in sign up action.");

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error("Error cerate Dwolla customer");

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function logOutAccount() {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function createLinkToken(user: User) {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id.toString(),
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export async function exchangePublicToken({
  publicToken,
  user,
}: exchangePublicTokenProps) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) throw new Error("Funding Error");

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    revalidatePath(ROUTES.HOME);

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getBanks({ userId }: GetBanksParams) {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    if (!banks) throw new NotFoundError("Banks");

    return parseStringify(banks.documents);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getBank({ documentId }: GetBankParams) {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    return parseStringify(bank.documents[0]);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getBankByAccountId({
  accountId,
}: GetBankByAccountIdParams) {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );

    if (!bank) throw new NotFoundError("Bank");

    return parseStringify(bank.documents[0]);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

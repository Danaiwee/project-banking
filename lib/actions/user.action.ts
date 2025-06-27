"use server";

import { cookies } from "next/headers";
import { ID } from "node-appwrite";

import { createAdminClient, createSessionClient } from "../appwrite";
import handleError from "../handlers/error";
import logger from "../logger";
import { parseStringify } from "../utils";

export async function signIn(userData: SignInParams) {
  const { email, password } = userData;

  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function signUp(userData: SignupParams) {
  const { email, password, firstName, lastName } = userData;

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    if (!newUserAccount) throw new Error("Error in sign up action.");

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    
    const user = await account.get();

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

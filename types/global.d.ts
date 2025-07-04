import { NextResponse } from "next/server";

declare global {
  interface Account {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialNumber: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    appwriteItemId: string;
    shareableId: string;
    subtype: string;
  }

  type User = Models.User<Models.Preferences>;

  interface UserType extends User {
    $id: string;
  }

  interface Transaction {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    type: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    $createdAt: string;
    channel: string;
    senderBankId: string;
    reveiverBankId: string;
  }

  interface Bank {
    $id: string;
    accountId: string;
    bankId: string;
    accessToken: string;
    fundingSourceUrl: string;
    userId: string;
    shareableId: string;
  }

  type ActionResponse<T = null> = {
    success: boolean;
    data?: T;
    errors?: {
      message?: string;
      details?: Record<string, string[]>;
    };
    status?: number;
  };

  type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
  type ErrorResponse = ActionResponse<undefined & { success: true }>;

  type APIResponse = NextResponse<SuccessResponse<T> | ErrorResponse>;
  type APIErrorResponse = NextResponse<ErrorResponse>;

  interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
  }
}

export {};

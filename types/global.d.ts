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
    sharableId: string;
  }

  type User = Models.User<Models.Preferences>;

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
    sharableId: string;
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
}

export {};

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

  interface User {
    $id: string;
    email: string;
    userId: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
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
    sharableId: string;
  }
}

export {};

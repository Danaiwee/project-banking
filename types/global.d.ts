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
}

export {};

interface SignupParams {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface exchangePublicTokenProps {
  user: User;
  publicToken: string;
}

interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

interface NewDwollaCustomerParams {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

interface TransferParams {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}

interface AddFundingSourceParams {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}

interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

interface GetUserInfoParams {
  userId: string;
}

interface GetBanksParams {
  userId: string;
}

interface GetAccountsParams {
  userId: string;
}

interface InstitutionParams {
  institutionId: string;
}

interface GetAccountParams {
  appwriteItemId: string;
}

interface GetBankParams {
  documentId: string;
}

interface GetTransactionByBankIdParams {
  bankId: string;
}

interface GetTransactionsParams {
  accessToken: string;
}


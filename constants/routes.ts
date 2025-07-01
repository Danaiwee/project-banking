export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  TRANSACTION_HISTORY: (id: string) => `/transaction-history/?id=${id}`,
};

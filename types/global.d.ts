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
}

export {};
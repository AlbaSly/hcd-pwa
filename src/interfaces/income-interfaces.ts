import { Account, IncomeType } from ".";

export interface Income {
    id: string;
    incomeType: IncomeType;
    account: Account;
    title: string;
    description?: string;
    datetime: string;
    createdAt: Date;
}

export interface CreateIncome {
    incomeType: IncomeType;
    account?: Account;
    title: string;
    description?: string;
    datetime: string;
}
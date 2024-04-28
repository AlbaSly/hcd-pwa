import { Account, IncomeType, OutcomeType } from ".";

export interface Outcome {
    id: string;
    outcomeType: OutcomeType;
    account: Account;
    title: string;
    description?: string;
    datetime: string;
    createdAt: Date;
}

export interface CreateOutcome {
    outcomeType: OutcomeType;
    account?: Account;
    title: string;
    description?: string;
    datetime: string;
}
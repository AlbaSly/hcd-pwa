import { Currency, Periodicity } from ".";

export interface Account {
    id: string;
    userId: string;
    name: string;
    periodicity: Periodicity;
    currency: Currency;
    initialAmount: number;
    amount: number;
    transactionsOperated: number;
    hexColor: string;
    createdAt: string;
}


export interface CreateAccount {
    name: string;
    periodicity: Periodicity;
    currency: Currency;
    initialAmount: number;
    hexColor: string;
}
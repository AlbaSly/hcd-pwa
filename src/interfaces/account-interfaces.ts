import { Currency, Periodicity } from ".";

export interface Account {
    id: string;
    userId: string;
    name: string;
    periodicity: Periodicity;
    currency: Currency;
    amount: number;
    hexColor: string;
    createdAt: string;
}


export interface CreateAccount {
    name: string;
    periodicity: Periodicity;
    currency: Currency;
    amount: number;
    hexColor: string;
}
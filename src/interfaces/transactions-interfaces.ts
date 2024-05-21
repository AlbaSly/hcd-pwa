import { TransactionTypes } from ".";
import { Account } from "./account-interfaces";

export interface Transaction {
    id: string;
    account: Account;
    type: TransactionTypes;
    category: TransactionCategory;
    title: string;
    amount: number;
    datetime: Date;
    datetimeString: string;
    createdAt: string;
}

export interface CreateTransaction {
    account: Account;
    type: TransactionTypes;
    category: TransactionCategory;
    title: string;
    amount: number;
    date: Date;
    time: Date;
}

export interface TransactionCategory {
    id: string;
    type: TransactionTypes;
    name: string;
    hexColor:string;
}
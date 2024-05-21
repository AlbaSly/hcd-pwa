export * from "./auth-interfaces";
export * from "./account-interfaces";
export * from "./transactions-interfaces";


export interface UserInfo {
    id: string;
    name: string;
    lastName: string;
    authByGoogle: boolean;
    email: string;
    createdAt: string;
    lastSessionAt: string;
}

export interface Currency {
    symbol?: string;
    name: string;
    symbol_native?: string;
    decimal_digits?: number;
    rounding?: number,
    code: string;
    name_plural?: string;
}

export interface Periodicity {
    id: string;
    name: string;
    days: number;
}

export type TransactionTypes = "income" | "outcome";
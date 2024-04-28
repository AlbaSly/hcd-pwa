import { Account, CreateAccount } from "../interfaces";

export class AccountsService {
    constructor() {}

    getCatalog(): Account[] {
        const lsData = localStorage.getItem('my-accounts');
        if (!lsData) return [];

        const serialized = JSON.parse(lsData);
        return serialized;
    }

    create(account: CreateAccount) {

        AccountsService.updateCount();
    }

    static genAccountName(): string {
        return `Mi Cuenta #${this.getCurrentCount() + 1}`;
    }

    static getCurrentCount(): number {
        const serializedData = localStorage.getItem('my-accounts_count');

        if (!serializedData) return 0;

        return Number(serializedData);
    }

    static updateCount() {
        const serializedData = localStorage.getItem('my-accounts_count');

        if (!serializedData) {
            localStorage.setItem('my-accounts_count', String(1));
        }

        const newCount = Number(serializedData) + 1;
        localStorage.setItem('my-accounts_count', String(newCount));
    }

    calcTransactions(account: Account): number {
        return 0;
    }
}
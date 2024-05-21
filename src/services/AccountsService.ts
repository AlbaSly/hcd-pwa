import { TimestampHelpers } from "../helpers/timestamp-helpers";
import { UUIDHelpers } from "../helpers/uuid-helpers";
import { Account, CreateAccount, TransactionTypes } from "../interfaces";
import { initializeDB, Stores } from "../lib/db";
import { TransactionsService } from "./TransactionsService";

export class AccountsService {

    private readonly COUNTER_NAME: string = 'hcd_accounts-counter';


    async createAccount(data: CreateAccount, userId: string) {

        const newAccount: Account = {
            id: UUIDHelpers.generate(),
            ...data,
            userId: userId,
            transactionsOperated: 0,
            initialAmount: data.initialAmount,
            amount: data.initialAmount,
            createdAt: TimestampHelpers.generate()
        }

        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);

            await store.add(newAccount);
            await tx.done;

            this.updateCount();

            return Promise.resolve('Cuenta creada correctamente.');
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al crear la cuenta.');
        }
    }

    async getAccounts(userId: string): Promise<Account[]> {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readonly');
            const store = tx.objectStore(Stores.Accounts);
            const index = store.index('userIdIndex');
            const accounts = await index.getAll(userId);

            await tx.done;

            return Promise.resolve(accounts);
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al obtener las cuentas.');
        }
    }

    async updateAccountTransactionsAndCurrentMoney(id: string) {
        const transactionsService = new TransactionsService();

        try {
            const amounts = await transactionsService.getPropertiesFromTransactionsByAccount(id);

            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
            const accountFound: Account | undefined = await store.get(id);

            if (!accountFound) return Promise.reject("No se encontró la cuenta.");

            const updatedAmount = accountFound.initialAmount + amounts.amount;
            const updatedNumberOfTransactions = amounts.transactionsLength;

            const updatedAccount: Account = {
                ...accountFound,
                amount: updatedAmount,
                transactionsOperated: updatedNumberOfTransactions
            }

            await store.put(updatedAccount);
            await tx.done;

            return Promise.resolve("Transacciones y Dinero actualizado de la cuenta.");
        } catch (error) {
            console.error(error);
            return Promise.reject("Hubo un error al actualizar las transacciones y dinero de la cuenta.");
        }
    }
    
    async editAccount(id: string, data: Partial<Account>): Promise<string> {
        const transactionsService = new TransactionsService();

        try {
            const transactionAmounts = await transactionsService.getPropertiesFromTransactionsByAccount(id);

            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
            const accountFound: Account | undefined = await store.get(id);

            if (!accountFound) return Promise.reject("No se encontró la cuenta.");

            const newAmount = data.initialAmount! + transactionAmounts.amount;

            const updatedAccount: Account = {
                ...accountFound,
                ...data,
                amount: newAmount,
            }

            await store.put(updatedAccount);
            await tx.done;

            await transactionsService.updateAccountDataInTransactions(id, updatedAccount);

            return Promise.resolve("Cuenta modificada correctamente.");
        } catch (error) {
            console.error(error);
            return Promise.reject("Hubo un error al editar la cuenta.");
        }
    }

    async deleteAccount(id: string): Promise<string> {
        const transactionsService = new TransactionsService();

        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);

            await store.delete(id);
            await tx.done;

            await transactionsService.deleteTransactionsByAccount(id);

            return Promise.resolve('Cuenta eliminada correctamente.');
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al eliminar la cuenta.');
        }
    }

    async updatePartialAccountDetails(id: string, data: Partial<Account>) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
            const accountFound: Account | undefined = await store.get(id);

            if (!accountFound) return Promise.reject("No se encontró la cuenta.");

            const updatedAccount: Account = {
                ...accountFound,
                ...data,
            }

            await store.put(updatedAccount);
            await tx.done;

            return Promise.resolve("Cuenta modificada correctamente.");
        } catch (error) {
            console.error(error);
            return Promise.reject("Hubo un error al editar la cuenta.");
        }
    }

    async increaseAccountNumberOfTransactions(accountId: string, amount: number, transactionType: TransactionTypes) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
            const accountFound: Account | undefined = await store.get(accountId);

            if (!accountFound) return Promise.reject('No se encontró la cuenta.');

            if (transactionType === 'outcome') accountFound.amount -= amount;
            if (transactionType === 'income') accountFound.amount += amount;

            accountFound.transactionsOperated++;

            await store.put(accountFound);
            await tx.done;

            return Promise.resolve(true);
        } catch (error) {
            console.error(error);
            return Promise.resolve(false);
        }
    }

    async decreaseAccountNumberOfTransactions(accountId: string, amount: number, transactionType: TransactionTypes) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
            const accountFound: Account | undefined = await store.get(accountId);

            if (!accountFound) return Promise.reject("No se encontró la cuenta.");

            accountFound.transactionsOperated--;

            if (transactionType === 'outcome') accountFound.amount += amount;
            if (transactionType === 'income') accountFound.amount -= amount;

            await store.put(accountFound);
            await tx.done;

            return Promise.resolve(true);
        } catch (error) {
            console.error(error);
            return Promise.resolve(false);
        }
    }

    generateName() {
        return `Cuenta #${this.getCount() + 1}`;
    }

    getCount() {
        const currentCount = localStorage.getItem(this.COUNTER_NAME);
        return currentCount ? Number.parseInt(currentCount) : 0;
    }

    updateCount() {
        const current = this.getCount() + 1;
        localStorage.setItem(this.COUNTER_NAME, current.toString());
    }
}
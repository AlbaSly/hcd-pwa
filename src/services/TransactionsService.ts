import { TimestampHelpers } from "../helpers/timestamp-helpers";
import { UUIDHelpers } from "../helpers/uuid-helpers";
import { Account, CreateTransaction, Transaction } from "../interfaces";
import { initializeDB, Stores } from "../lib/db";
import { DateUtils } from "../utils/date-utilts";
import { AccountsService } from "./AccountsService";

export class TransactionsService {

    private readonly accountsService = new AccountsService();

    constructor() {}

    async createTransaction(data: CreateTransaction): Promise<string> {

        const {
            account,
            type,
            category,
            title,
            amount,
            date,
            time
        } = data;

        const newTransaction: Transaction = {
            id: UUIDHelpers.generate(),
            account,
            type,
            category,
            title,
            amount,
            datetime: DateUtils.mergeDateAndTime(date, time),
            datetimeString: DateUtils.mergeDateAndTime_String(date, time),

            createdAt: TimestampHelpers.generate(),
        }

        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readwrite');
            const store = tx.objectStore(Stores.Transactions);

            await store.add(newTransaction);
            await tx.done;

            await this.accountsService.increaseAccountNumberOfTransactions(account.id, amount, type);

            return Promise.resolve('Movimiento agregado correctamente');
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al crear el movimiento.');
        }
    }

    async getTransactions(accountId?: string): Promise<Transaction[]> {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readonly');
            const store = tx.objectStore(Stores.Transactions);

            const transactions: Transaction[] = await store.getAll();
            tx.done;

            if(accountId) return transactions.filter(tr => tr.account.id === accountId);

            return transactions;
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al obtener el listado de movimientos.');
        }
    }

    async deleteTransaction(id: string) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readwrite');
            const store = tx.objectStore(Stores.Transactions);
            const transactionFound: Transaction = await store.get(id);

            await store.delete(id);
            await tx.done;

            await this.accountsService.decreaseAccountNumberOfTransactions(transactionFound.account.id, transactionFound.amount, transactionFound.type);

            return Promise.resolve('Movimiento eliminado correctamente.');
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al eliminar el movimiento.');
        }
    }

    async deleteTransactionsByAccount(accountId: string) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readwrite');
            const store = tx.objectStore(Stores.Transactions);

            let cursor = await store.openCursor();

            while (cursor) {
                const transaction = cursor.value;
                if (transaction.account.id === accountId) {
                    await store.delete(cursor.primaryKey);
                }
                cursor = await cursor.continue();
            }

            await tx.done;

            return Promise.resolve('Movimientos de esta cuenta eliminados correctamente.');
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error eliminando los movimientos de esta cuenta.');
        }
    }

    async editTransaction(id: string, data: Partial<CreateTransaction>) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readwrite');
            const store = tx.objectStore(Stores.Transactions);
            const transactionFound: Transaction | undefined = await store.get(id);

            if (!transactionFound) return Promise.reject("No se encontró la transacción.");

            const transacctionAccountOwner = transactionFound.account;
            const updatedTransaction: Transaction = {
                ...transactionFound,
                ...data,
                datetime: DateUtils.mergeDateAndTime(data.date!, data.time!),
                datetimeString: DateUtils.mergeDateAndTime_String(data.date!, data.time!),
            }

            await store.put(updatedTransaction);
            await tx.done;

            await this.accountsService.updateAccountTransactionsAndCurrentMoney(transacctionAccountOwner.id);

            if (data.account && transacctionAccountOwner.id !== data.account.id) {
                await this.accountsService.updateAccountTransactionsAndCurrentMoney(data.account.id);
            }

            return Promise.resolve("Transacción modificada correctamente.");
        } catch (error) {
            console.error(error);
            return Promise.reject("Hubo un error al editar la transacción.");
        }
    }

    async getPropertiesFromTransactionsByAccount(accountId: string) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readonly');
            const store = tx.objectStore(Stores.Transactions);

            let transactions: Transaction[] = await store.getAll();
            tx.done;

            transactions = transactions.filter(tr => tr.account.id === accountId);

            let amount = 0;
            transactions.forEach(tr => {
                if (tr.type === "income") amount += tr.amount
                if (tr.type === "outcome") amount -= tr.amount
            });

            return {
                amount,
                transactionsLength: transactions.length
            }
        } catch (error) {
            console.error(error);
            return Promise.reject('Hubo un error al obtener el listado de movimientos.');
        }
    }

    async updateAccountDataInTransactions(accountId: string, updatedAccountData: Account) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Transactions, 'readwrite');
            const store = tx.objectStore(Stores.Transactions);
            let cursor = await store.openCursor();

            while (cursor) {
                const transaction = cursor.value;
                if (transaction.account.id === accountId) {
                    transaction.account = updatedAccountData;
                    await cursor.update(transaction);
                }
                cursor = await cursor.continue();
            }

            await tx.done;
            return Promise.resolve("Se han actualizado los datos de la cuenta vinculada a las transacciones.");
        } catch (error) {
            console.error(error);
            return Promise.reject("Hubo un error al actualizar los datos de la cuenta vinculada a las transacciones.");
        }
    }


}
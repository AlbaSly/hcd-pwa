import { useToast } from "../context/ToastContext"
import { CreateTransaction, Transaction } from "../interfaces";
import { TransactionsService } from "../services/TransactionsService";


export const useTransactions = () => {

    const {
        showMessage,
    } = useToast();

    const transactionsService = new TransactionsService();

    const createTransaction = async (data: CreateTransaction): Promise<void> => {
        try {
            const result = await transactionsService.createTransaction(data);

            showMessage({
                severity: 'success',
                detail: result
            });
        } catch (error) {
            showMessage({
                severity: 'error',
                detail: <string>error
            });
        }
    }

    const getTransactions = async (accountId?: string): Promise<Transaction[]> => {
        try {
            const result = await transactionsService.getTransactions(accountId);

            return result;
        } catch (error) {
            showMessage({
                severity: 'error',
                detail: <string>error,
            });
            return [];
        }
    }

    const editTransaction = async (id: string, data: Partial<CreateTransaction>) => {
        try {
            const result = await transactionsService.editTransaction(id, data);

            showMessage({
                severity: 'success',
                detail: result
            });
        } catch (error) {
            showMessage({
                severity: 'error',
                detail: <string>error,
            });
        }
    }

    const deleteTransaction = async (id: string) => {
        try {
            const result = await transactionsService.deleteTransaction(id);

            showMessage({
                severity: 'warn',
                detail: result
            });
        } catch (error) {
            showMessage({
                severity: 'error',
                detail: <string>error
            });
        }
    }

    const deleteTransactionsByAccount = async (accountId: string) => {
        try {
            const result = await transactionsService.deleteTransactionsByAccount(accountId);

            showMessage({
                severity: 'warn',
                detail: result,
                life: 4000,
            });
        } catch (error) {
            showMessage({
                severity: 'error',
                detail: <string>error,
                life: 4000
            });
        }
    }

    return {
        createTransaction,
        getTransactions,
        editTransaction,
        deleteTransaction,
        deleteTransactionsByAccount,
    }
}
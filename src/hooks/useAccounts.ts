import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext";
import { Account, CreateAccount } from "../interfaces"
import { AccountsService } from "../services/AccountsService";

export const useAccounts = () => {

    const {
        userInfo,
    } = useAuth();

    const {
        showMessage,
    } = useToast();

    const accountsService = new AccountsService();

    const createAccount = async (data: CreateAccount): Promise<void> => {
        try {
            const result = await accountsService.createAccount(data, userInfo.id);

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

    const getAccounts = async (): Promise<Account[]> => {
        try {
            const result = await accountsService.getAccounts(userInfo.id);

            return result;
        } catch (error) {
            showMessage({
                severity: 'error',
                detail: <string>error
            });
            return [];
        }
    }

    const editAccount = async (id: string, data: Partial<Account>): Promise<void> => {
        try {
            const result = await accountsService.editAccount(id, data);
    
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

    const deleteAccount = async (id: string) => {
        try {
            const result = await accountsService.deleteAccount(id);

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

    function generateName() {
        return accountsService.generateName();
    }

    return {
        createAccount,
        getAccounts,
        editAccount,
        deleteAccount,
        generateName,
    }
}
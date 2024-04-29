import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext";
import { TimestampHelpers } from "../helpers/timestamp-helpers";
import { UUIDHelpers } from "../helpers/uuid-helpers";
import { Account, CreateAccount } from "../interfaces"
import { initializeDB, Stores } from "../lib/db";

export const useAccounts = () => {

    const COUNTER_NAME = 'hcd_accounts-counter';

    const {
        userInfo,
    } = useAuth();

    const {
        showMessage,
    } = useToast();


    const createAccount = async (data: CreateAccount): Promise<void> => {

        const newAccount: Account = {
            id: UUIDHelpers.generate(),
            userId: userInfo.id,
            ...data,
            createdAt: TimestampHelpers.generate()
        }

        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
            await store.add(newAccount);
            await tx.done;

            updateCount();
            
            showMessage({
                severity: 'success',
                detail: 'Cuenta creada correctamente.'
            });
        } catch (error) {
            console.error(error);
            showMessage({
                severity: 'error',
                detail: 'Hubo un error.'
            });
        }
    }

    const getAccounts = async (): Promise<Account[]> => {
        const db = await initializeDB();
        const tx = db.transaction(Stores.Accounts, 'readonly');
        const store = tx.objectStore(Stores.Accounts);
        const index = store.index("userIdIndex");
        const accounts = await index.getAll(userInfo.id);

        await tx.done;
        return accounts;
    }

    const deleteAccount = async (id: string) => {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.Accounts, 'readwrite');
            const store = tx.objectStore(Stores.Accounts);
    
            await store.delete(id);
            await tx.done;

            showMessage({
                severity: 'warn',
                detail: 'Cuenta eliminada correctamente.'
            })
        } catch (error) {
            console.error(error);
            showMessage({
                severity: 'error',
                detail: 'Hubo un error.'
            });
        }
    }

    function generateName() {
        return `Cuenta #${getCount() + 1}`;
    }

    function getCount() {
        const currentCount = localStorage.getItem(COUNTER_NAME);
        
        return currentCount ? Number.parseInt(currentCount) : 0;
    }

    function updateCount() {
        const current = getCount() + 1;

        localStorage.setItem(COUNTER_NAME, current.toString());
    }

    return {
        createAccount,
        getAccounts,
        deleteAccount,
        generateName,
    }
}
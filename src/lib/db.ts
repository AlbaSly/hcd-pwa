import { openDB } from "idb"
import { config } from "../configs"

export enum Stores {
    UserInfo = 'user_info',

    Accounts = 'accounts',
    Transactions = 'transactions',

    Currencies = 'currencies',
    Periodicities = 'periodicities',
    TransactionCategories = 'transaction_categories',
}

export const initializeDB = async () => {
    return openDB(config.INDEXED_DB_NAME, config.INDEXEDB_DB_VERSION, {
        upgrade(db) {

            db.createObjectStore(Stores.UserInfo, {keyPath: 'id'});

            const accountsStore = db.createObjectStore(Stores.Accounts, {keyPath: 'id'});
            accountsStore.createIndex('userIdIndex', 'userId');

            db.createObjectStore(Stores.Transactions, {keyPath: 'id'});
        }
    });
}
import { openDB } from "idb"
import { config } from "../configs"

export enum Stores {
    Accounts = 'accounts',
    Incomes = 'incomes',
    Outcomes = 'outcomes',

    Currencies = 'currencies',
    Periodicities = 'periodicities',
    OutcomeTypes = 'outcome_types',
    IncomeTypes = 'income_types',
}

export const initializeDB = async () => {
    return openDB(config.INDEXED_DB_NAME, config.INDEXEDB_DB_VERSION, {
        upgrade(db) {
            const accountsStore = db.createObjectStore(Stores.Accounts, {keyPath: 'id'});
            accountsStore.createIndex('userIdIndex', 'userId');

            db.createObjectStore(Stores.Incomes, {keyPath: 'id'});
            db.createObjectStore(Stores.Outcomes, {keyPath: 'id'});
        }
    });
}
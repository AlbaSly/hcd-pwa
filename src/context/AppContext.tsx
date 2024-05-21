import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, CreateAccount, Currency, Periodicity, Transaction, TransactionCategory } from "../interfaces";
import { PeriodicitiesService } from "../services/PeriodicitiesService";
import { CurrenciesService } from "../services/CurrenciesService";

import { useAccounts } from "../hooks/useAccounts";
import { TransactionCategoriesService } from "../services/TransactionCategoriesService";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionsService } from "../services/TransactionsService";


interface AppContextState {
    defaultAccountValue: CreateAccount;

    accountSelected: Account | undefined;
    setAccountSelected: (value: Account | undefined) => void;

    accounts: Account[];
    setAccounts: (value: Account[]) => void;
    loadAccounts: () => void;

    periodicities: Periodicity[];
    setPeriodicities: (value: Periodicity[]) => void;
    loadPeriodicities: () => void;

    currencies: Currency[];
    setCurrencies: (value: Currency[]) => void;
    loadCurrencies: () => void;

    transactionCategories: TransactionCategory[];
    loadTransactionCategories: () => void;

    transactions: Transaction[];
    loadTransactions: (account?: Account) => void;

    filteredTransactions: Transaction[];
    updateFilteredTransactions: (accountId?: string) => Promise<void>;
}

const AppContext = createContext<AppContextState | null>(null);


export const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const {
        getAccounts,
        generateName: generateAccountName,
    } = useAccounts();
    
    const {
        getTransactions,
    } = useTransactions();

    const [ accountSelected, setAccountSelected ] = useState<Account>();
    const [ accounts, setAccounts ] = useState<Account[]>([]);
    const [ periodicities, setPeriodicities ] = useState<Periodicity[]>([]);
    const [ currencies, setCurrencies ] = useState<Currency[]>([]);
    const [ transactionCategories, setTransactionCategories ] = useState<TransactionCategory[]>([]);
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);
    const [ filteredTransactions, setFilteredTransactions ] = useState<Transaction[]>([]);

    const periodicitesService = new PeriodicitiesService();
    const currenciesService = new CurrenciesService();
    const transactionCategoriesService = new TransactionCategoriesService();
    const transactionsService = new TransactionsService();


    const loadAccounts = async () => {
        const accounts = await getAccounts();
        setAccounts(accounts);
    }
    const loadPeriodicities = () => setPeriodicities(periodicitesService.getCatalog());
    const loadCurrencies = () => setCurrencies(currenciesService.getCatalog());
    const loadTransactionCategories = () => setTransactionCategories(transactionCategoriesService.getCatalog());
    const loadTransactions = async (account?: Account) => {
        const transactions = await getTransactions(account ? account.id : undefined);
        setTransactions(transactions);
    }
    const updateFilteredTransactions = async (accountId?: string) => {
        if (!accountId) return setFilteredTransactions([]);
        
        const data = await transactionsService.getTransactions(accountId);
        setFilteredTransactions(data);
    }

    const [ defaultAccountValue ] = useState<CreateAccount>({
        name: generateAccountName(),
        periodicity: periodicitesService.getDefaultValue(),
        currency: currenciesService.getDefaultValue(),
        initialAmount: 0,
        hexColor: "87ceebff",
    });

    useEffect(() => {
        loadAccounts();
        loadPeriodicities();
        loadCurrencies();
        loadTransactionCategories();
    }, []);

    const state: AppContextState = {
        defaultAccountValue,

        accountSelected,
        setAccountSelected,

        accounts,
        setAccounts,
        loadAccounts,

        periodicities,
        setPeriodicities,
        loadPeriodicities,

        currencies,
        setCurrencies,
        loadCurrencies,
        
        transactionCategories,
        loadTransactionCategories,

        transactions,
        loadTransactions,

        filteredTransactions,
        updateFilteredTransactions,
    }

    return (
        <AppContext.Provider value={state}>
            { children }
        </AppContext.Provider>
    )
}


export const useApp = (): AppContextState => {
    const context = useContext(AppContext);

    if (!context) throw new Error("useApp must be used with AppProvider.");

    return context;
}
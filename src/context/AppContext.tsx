import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, CreateAccount, CreateIncome, Currency, IncomeType, OutcomeType, Periodicity } from "../interfaces";
import { AccountsService } from "../services/AccountsService";
import { PeriodicitiesService } from "../services/PeriodicitiesService";
import { CurrenciesService } from "../services/CurrenciesService";
import { IncomeAndOutComesService } from "../services/IncomeAndOutcomesService";

interface AppContextState {
    defaultAccountValue: CreateAccount;
    defaultTransactionValue: CreateIncome;

    accounts: Account[];
    setAccounts: (value: Account[]) => void;
    loadAccounts: () => void;

    periodicities: Periodicity[];
    setPeriodicities: (value: Periodicity[]) => void;
    loadPeriodicities: () => void;

    currencies: Currency[];
    setCurrencies: (value: Currency[]) => void;
    loadCurrencies: () => void;

    incomeTypes: IncomeType[];
    outcomeTypes: OutcomeType[];
}

const AppContext = createContext<AppContextState | null>(null);


export const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const [ accounts, setAccounts ] = useState<Account[]>([]);
    const [ periodicities, setPeriodicities ] = useState<Periodicity[]>([]);
    const [ currencies, setCurrencies ] = useState<Currency[]>([]);
    const [ incomeTypes, setIncomeTypes ] = useState<IncomeType[]>([]);
    const [ outcomeTypes, setOutcomeTypes ] = useState<OutcomeType[]>([]);

    const accService = new AccountsService();
    const periodicitesService = new PeriodicitiesService();
    const currenciesService = new CurrenciesService();
    const inAndOutcomesService = new IncomeAndOutComesService();


    const loadAccounts = () => setAccounts(accService.getCatalog());
    const loadPeriodicities = () => setPeriodicities(periodicitesService.getCatalog());
    const loadCurrencies = () => setCurrencies(currenciesService.getCatalog());
    const loadIncomeTypes = () => setIncomeTypes(inAndOutcomesService.getIncomeTypesCatalog());
    const loadOutcomeTypes = () => setOutcomeTypes(inAndOutcomesService.getOutcomeTypesCatalog());


    const [ defaultAccountValue ] = useState<CreateAccount>({
        name: AccountsService.genAccountName(),
        periodicity: periodicitesService.getDefaultValue(),
        currency: currenciesService.getDefaultValue(),
        amount: 0,
        hexColor: "87ceebff",
    });

    const [ defaultTransactionValue ] = useState<CreateIncome>({
        account: undefined,
        datetime: '',
        incomeType: inAndOutcomesService.getDefaultIncomeTypeValue(),
        title: 'Mi ingreso',
        description: undefined
    });
    
    useEffect(() => {
        loadAccounts();
        loadPeriodicities();
        loadCurrencies();
        loadIncomeTypes();
        loadOutcomeTypes();
    }, []);

    const state: AppContextState = {
        defaultTransactionValue,
        defaultAccountValue,
        accounts,
        setAccounts,
        loadAccounts,

        periodicities,
        setPeriodicities,
        loadPeriodicities,

        currencies,
        setCurrencies,
        loadCurrencies,
        
        incomeTypes,
        outcomeTypes
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
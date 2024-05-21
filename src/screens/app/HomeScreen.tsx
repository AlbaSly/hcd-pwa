import { AppTitle } from "../../components/app"

import AccountsList from "../../components/app/AccountsList";
import { CreateAccountSection, CreateTransactionSection } from "../../components/app/sections";
import { useAuth } from "../../context/AuthContext";
import { TransactionsList } from "../../components/app/TransactionsList";
import { useApp } from "../../context/AppContext";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {

    const {
        userInfo
    } = useAuth();

    const {
        loadTransactions,
        transactions,
    } = useApp();
    
    const navigate = useNavigate();

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <>
            <AppTitle>
                <h1>Hola, <span>{userInfo.name}</span></h1>
            </AppTitle>

            <CreateTransactionSection />

            <main>
                <section className="container mx-auto mb-4">
                    <div className="flex justify-content-center align-items-center gap-4">
                        <h2>Mis cuentas</h2>

                        <CreateAccountSection />
                    </div>

                    <AccountsList />
                </section>

                <section className="container mx-auto mb-4">
                    <h2>Reciente</h2>

                    <TransactionsList transactions={transactions} limit={5}/>

                    {
                        transactions.length 

                        ? (
                            <Button onClick={() => navigate('/app/transactions')} className="block mx-auto my-4" raised>Ver más movimientos...</Button>
                        )

                        : (
                            <></>
                        )
                    }
                </section>
            </main>
        </>
    )
}
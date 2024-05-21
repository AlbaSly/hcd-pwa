import { useEffect, useRef } from "react";
import { AppTitle } from "../../components/app";
import AccountsList from "../../components/app/AccountsList";
import { useApp } from "../../context/AppContext";
import { DOMUtils } from "../../utils/dom-utils";
import { TransactionsList } from "../../components/app/TransactionsList";


export const TransactionsScreen = () => {

    const {
        accountSelected,
        filteredTransactions,
        updateFilteredTransactions,
    } = useApp();

    const containerRef = useRef(null);

    const executeScroll = () => (containerRef as any).current.scrollIntoView();

    useEffect(() => {
        const load = async () => {
            if (accountSelected) {
                await updateFilteredTransactions(accountSelected.id);

                executeScroll();
            }
        }
        load();
    }, [accountSelected]);

    return (
        <>
            <AppTitle>
                <h1>Movimientos</h1>
            </AppTitle>

            <main>
                <section className="container mx-auto mb-4">
                    <div className="flex justify-content-center align-items-center gap-4">
                        <h2>Seleccionar Cuenta</h2>
                    </div>

                    <AccountsList allowAccountSelection={true} />
                </section>

                {
                    accountSelected && (
                        <section className="container mx-auto mb-4">
                            <h2>Transacciones</h2>
                            <div ref={containerRef} className={"p-2 border-round shadow-2 block w-6 mx-auto my-4"} style={{backgroundColor: '#'+accountSelected.hexColor}}>
                                <p className="text-center font-medium text-2xl my-0" style={{color: DOMUtils.darkifyHexColor(accountSelected.hexColor)}}>{accountSelected.name}</p>
                            </div>

                            <TransactionsList transactions={filteredTransactions}/>

                        </section>
                    )
                }
            </main>
        </>
    )
};

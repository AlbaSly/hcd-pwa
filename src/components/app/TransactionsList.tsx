import { Button } from "primereact/button";
import { Transaction, TransactionTypes } from "../../interfaces"
import { FormatUtils } from "../../utils/format-utils";
import { confirmDialog } from "primereact/confirmdialog";
import { useApp } from "../../context/AppContext";
import { useTransactions } from "../../hooks/useTransactions";
import { useToast } from "../../context/ToastContext";
import { useState } from "react";
import { CreateTransactionSection } from "./sections";

type TransactionsListProps = {
    transactions: Transaction[];
    limit?: number;
}
export const TransactionsList = (props: TransactionsListProps) => {
    
    const {
        limit,
        transactions
    } = props;

    const {
        loadAccounts,
        loadTransactions,
        updateFilteredTransactions,
    } = useApp();

    const {
        deleteTransaction,
    } = useTransactions();

    const {
        showMessage,
    } = useToast();

    const [ transactionSelected, setTransactionSelected ] = useState<Transaction>();
    const [ editionMode, setEditionMode ] = useState<boolean>(false);
    
    const renderChevron = (type: TransactionTypes) => {
        return (
            // <i className="pi pi-chevron-down text-red-500 font-bold text-3xl"></i>
            <i className={[
                'pi',
                type === 'income' ? 'pi-chevron-up text-green-500' : 'pi-chevron-down text-red-500',
                'font-bold text-3xl'
            ].join(' ')}></i>
        );
    }

    const deleteThis = async (id: string) => {
        confirmDialog({
            header: 'Eliminar Movimiento',
            message: '¿Está seguro de eliminar este movimiento?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                await deleteTransaction(id);
                await updateFilteredTransactions();
                loadAccounts();
                loadTransactions();
            },
            reject: () => {
                showMessage({
                    detail: 'Operación cancelada.',
                    severity: 'error'
                });
            }
        });
    }

    const handleEdition = (transaction: Transaction) => {
        setTransactionSelected(transaction);
        setEditionMode(true);
    }

    const handleOnEditionFinished = () => {
        setTransactionSelected(undefined);
        setEditionMode(false);
    }

    return (
       <>
        {
            editionMode && <CreateTransactionSection editionMode={true} transactionToEdit={transactionSelected} showFromExternalComponent={true} editionFinishedHandler={handleOnEditionFinished}/>
        }

        <div className="container mx-auto flex flex-col gap-3 mb-2">
            {
                transactions.length
                ? (
                    <>
                    {
                        transactions.map((transaction, i) => {
                            if (limit && (i+1 > limit)) return;

                            return (
                                <div key={i} className="card p-3 pl-5 bg-white border-round shadow-2 relative">
                                    <div className="p-2 absolute top-0 left-0 bottom-0 border-round-left shadow-1" style={{backgroundColor: '#'+transaction.account.hexColor}}></div>
                                    <div className="flex flex-column md:flex-row justify-content-center md:justify-content-between">
                                        <p className="text-center md:text-left m-0 text-base font-medium text-gray-500">Categoría: {transaction.category.name}</p>
                                        <p className="text-center md:text-right m-0 text-base font-light text-gray-500">{transaction.datetime.toLocaleDateString()}, <i>{transaction.datetime.toLocaleTimeString()} hrs</i></p>
                                    </div>
                                    <div className="flex flex-column md:flex-row-reverse align-items-center justify-content-between my-2">
                                        {/* <div className="flex align-items-center gap-4">
                                            <Button icon="pi pi-pen-to-square" raised text className="text-gray-500" style={{height: '32px', width: '32px'}}/>
                                            <p className="text-xl font-bold text-gray-600">{transaction.title}</p>
                                        </div> */}
                                        <div className="text-2xl font-bold text-gray-700 flex align-items-center gap-2">
                                            {renderChevron(transaction.type)}
                                            <p className="">
                                                {transaction.account.currency.symbol_native ? transaction.account.currency.symbol_native + ' ' : ''}
                                                {FormatUtils.formatMoney(transaction.amount, transaction.account.currency.decimal_digits)}{' '}
                                                {transaction.account.currency.code}
                                            </p>
                                        </div>
                                        <div className="flex flex-column-reverse md:flex-row gap-4">
                                            <div className="flex gap-3 justify-content-center md:justify-content-start">
                                                <Button onClick={() => handleEdition(transaction)} icon="pi pi-pen-to-square" raised text className="text-gray-500" style={{height: '32px', width: '32px'}}/>
                                                <Button onClick={() => deleteThis(transaction.id)} severity='danger' icon="pi pi-trash" text raised style={{height: '32px', width: '32px'}}/>
                                            </div>
                                            <div>
                                                <p className="m-0 text-gray-500 md:text-2xl font-medium">{transaction.title}</p>
                                                <p className="m-0 text-gray-400 font-medium"><span className="text-gray-400 font-medium border-bottom-2" style={{borderBottomColor: '#'+transaction.account.hexColor}}>{transaction.account.name}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </>
                )

                : (
                    <h3 className="my-8 text-gray-400">Sin transacciones.</h3>
                )
            }
        </div>
       </>
    )
}
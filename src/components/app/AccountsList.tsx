
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Account } from '../../interfaces';
import { FormatUtils } from '../../utils/format-utils';
import { useApp } from '../../context/AppContext';
import { useAccounts } from '../../hooks/useAccounts';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useToast } from '../../context/ToastContext';
import { useState } from 'react';
import { CreateAccountSection } from './sections';
import { DOMUtils } from '../../utils/dom-utils';


type AccountsListProps = {
    allowAccountSelection?: boolean;
}
export default function AccountsList(props: AccountsListProps) {

    const {
        accounts,
        loadAccounts,
        loadTransactions,
        setAccountSelected: selectAccount,
        accountSelected: globalAccountSelected,
    } = useApp();

    const {
        showMessage,
    } = useToast();

    const {
        deleteAccount,
    } = useAccounts();

    const {
        allowAccountSelection,
    } = props;

    const [ accountSelected, setAccountSelected ] = useState<Account>();
    const [ editionMode, setEditionMode ] = useState<boolean>(false);

    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const deleteThis = async (id: string) => {
        confirmDialog({
            header: 'Eliminar Cuenta',
            message: '¿Está seguro de eliminar esta cuenta? Todos los movimientos relacionados a ella se perderán.',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                await deleteAccount(id);
                loadAccounts();
                loadTransactions();
                selectAccount(undefined);
            },
            reject: () => {
                showMessage({
                    detail: 'Operación cancelada.',
                    severity: 'error'
                });
            }
        })
    }

    const handleEdition = (account: Account) => {
        setAccountSelected(account);
        setEditionMode(true);
    }

    const handleOnEditionFinished = () => {
        setAccountSelected(undefined);
        setEditionMode(false);
    }
    
    const accountTemplate = (account: Account) => {
        return (
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round m-2">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <div>
                            <span className="block text-500 font-medium">{account.name}</span>
                            <Tag>{account.periodicity.name}</Tag>
                        </div>
                        <p className="text-600 font-bold text-xl text-center">
                            {FormatUtils.formatMoney(account.amount, account.currency.decimal_digits)}{' '}
                            {account.currency.symbol_native ?? ''}
                            {account.currency.code}
                        </p>
                    </div>
                    
                    <div className='flex flex-col justify-content-center align-items-center gap-2'>
                        <div className="flex align-items-center justify-content-center border-round" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: `#${account.hexColor}`}}>
                            <i className="pi pi-wallet text-xl" style={{color: DOMUtils.darkifyHexColor(account.hexColor)}}></i>
                        </div>
                        <Button onClick={() => handleEdition(account)} severity='info' icon="pi pi-pen-to-square" text raised style={{height: '40px', width: '40px'}}/>
                        <Button onClick={() => deleteThis(account.id)} severity='danger' icon="pi pi-trash" text raised style={{height: '40px', width: '40px'}}/>
                    </div>
                </div>
                <span className="text-yellow-400 font-medium">{account.transactionsOperated} {' '}</span>
                <span className="text-500">transacciones realizadas.</span>

                {
                    allowAccountSelection && (
                        <Button 
                            onClick={() => selectAccount(account)} 
                            className='block mx-auto mt-4' 
                            size='small' 
                            disabled={globalAccountSelected && globalAccountSelected.name == account.name}
                            severity={globalAccountSelected && globalAccountSelected.name == account.name ? 'secondary' : undefined}
                        >
                            {globalAccountSelected && globalAccountSelected.name == account.name ? 'Seleccionado' : 'Seleccionar'}
                        </Button>
                    )
                }
            </div>
        )
    }
    
    return (
        <>
        {
            editionMode && <CreateAccountSection editionMode={true} accountToEdit={accountSelected} showFromExternalComponent={editionMode} editionFinishedHandler={handleOnEditionFinished} />
        }
        
        {
            accounts.length 
            ? (
                <>
                    <ConfirmDialog />

                    <div className="card">
                        <Carousel value={accounts} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={accountTemplate} />
                    </div>

                </>
            )
            : (
                <h3 className='my-8 text-gray-400'>Sin cuentas.</h3>
            )
        }
        </>
    )
}
        
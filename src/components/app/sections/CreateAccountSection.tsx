import { useState } from "react"
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import { CreateAccount, Currency, Periodicity } from "../../../interfaces";
import { CurrencySelector } from "../selectors/CurrencySelector";
import { AccountColorSelector } from "../selectors/AccountColorSelector";
import { AccountPeriodicitySelector } from "../selectors/AccountPeriodicitySelector";
import { useToast } from "../../../context/ToastContext";
import { AccountsService } from "../../../services/AccountsService";
import { AuthService } from "../../../services/AuthService";
import { useApp } from "../../../context/AppContext";
import { MAX_DECIMAL_LENGTH } from "../../../constants/app-constants";

export const CreateAccountSection = () => {
    
    const {
        defaultAccountValue,
        periodicities,
        currencies,
        loadAccounts,
    } = useApp();

    const { showMessage } = useToast();
    const dialogsPosition = "center";

    const authService = new AuthService();
    const accountsService = new AccountsService();
    
    const [ accountName, setAccountName ] = useState<string>(defaultAccountValue.name);
    const [ accountPeriodicity, setAccountPeriodicity ] = useState<Periodicity>(defaultAccountValue.periodicity);
    const [ amount, setamount ] = useState<number>(defaultAccountValue.amount);
    const [ accountColor, setAccountColor ] = useState<string>(defaultAccountValue.hexColor);
    const [ accountCurrency, setAccountCurrency ] = useState<Currency>(defaultAccountValue.currency);

    const updateamount = (value: number) => setamount(value);
    const updateAccountName = (value: string) => setAccountName(value);

    const create = () => {

        const account: CreateAccount = {
            name: accountName,
            currency: accountCurrency,
            amount,
            periodicity: accountPeriodicity,
            hexColor: accountColor,
        }

        accountsService.create(account);
        
        loadAccounts();
        closeDialogs();

        showMessage({
            severity: 'success',
            detail: 'Cuenta creada correctamente.',
            life: 2000,
        });
    }

    function resetStates() {
        setAccountName(AccountsService.genAccountName());
        setAccountPeriodicity(defaultAccountValue.periodicity);
        setamount(defaultAccountValue.amount);
        setAccountColor(defaultAccountValue.hexColor);
        setAccountCurrency(defaultAccountValue.currency);
    }

    /**FORM STEP */

    const [ showSection1, setShowSection1 ] = useState(false);
    const [ showSection2, setShowSection2 ] = useState(false);
    const [ showSection3, setShowSection3 ] = useState(false);

    const go_1_to_2 = () => {
        setShowSection1(false);
        setShowSection2(true);
    }

    const go_2_to_3 = () => {
        setShowSection2(false);
        setShowSection3(true);
    }

    const go_3_to_2 = () => {
        setShowSection3(false);
        setShowSection2(true);
    }

    const go_2_to_1 = () => {
        setShowSection2(false);
        setShowSection1(true);
    }

    const section1Footer = () => (
        <Button onClick={() => go_1_to_2()} raised>Siguiente</Button>
    );

    const section2Footer = () => (
        <div>
            <Button onClick={() => go_2_to_1()} text>Atrás</Button>
            <Button onClick={() => go_2_to_3()} raised>Siguiente</Button>
        </div>
    );

    const section3Footer = () => (
        <div className="mt-2">
            <Button onClick={() => go_3_to_2()} text>Atrás</Button>
            <Button onClick={() => create()} raised>Hecho</Button>
        </div>
    )

    function closeDialogs() {
        setShowSection1(false);
        setShowSection2(false);
        setShowSection3(false);

        resetStates();
    }

    return (
        <>
            <Button onClick={() => setShowSection1(true)} icon="pi pi-plus" rounded text raised className="bg-white font-bold"/>

            <Dialog 
                header="Nueva Cuenta" 
                visible={showSection1} 
                onHide={closeDialogs} 
                draggable={false}
                className="w-11 xl:w-6" 
                position={dialogsPosition}
                footer={section1Footer}
            >
                <section>
                    <h3>¿Cómo planeas gestionar tus gastos?</h3>
                    <AccountPeriodicitySelector value={accountPeriodicity} periodicities={periodicities} handleSelection={setAccountPeriodicity}/>

                    <p className="text-gray-500"><small>Nota: Esto es solo como referencia.</small></p>
                </section>
            </Dialog>

            <Dialog 
                header="Nueva Cuenta" 
                visible={showSection2} 
                onHide={(closeDialogs)} 
                draggable={false}
                className="w-11 xl:w-6" 
                position={dialogsPosition}
                footer={section2Footer}
            >

                <section>
                    <h3>Nombre</h3>

                    <br />

                    {/*@ts-ignore*/}
                    <FloatLabel>
                        <InputText 
                            id="name"
                            value={accountName}
                            onChange={(e) => updateAccountName(e.target.value)}
                            className="w-full"
                            autoComplete="off"
                        />
                        <label htmlFor="name">Nombre de la cuenta</label>
                    </FloatLabel>

                    <AccountColorSelector value={accountColor} handleSelection={setAccountColor}/>
                </section>
            </Dialog>

            <Dialog
                header="Nueva Cuenta"
                visible={showSection3} 
                onHide={closeDialogs} 
                draggable={false}
                className="w-11 xl:w-6"
                position={dialogsPosition}
                footer={section3Footer}
                >
                <section>
                    <h3>Monto Inicial</h3>

                    <br />

                    {/*@ts-ignore*/}
                    <FloatLabel>
                        <InputNumber
                            id="amount"
                            min={0.00}
                            minFractionDigits={!accountCurrency.decimal_digits ? MAX_DECIMAL_LENGTH : accountCurrency.decimal_digits}
                            maxFractionDigits={!accountCurrency.decimal_digits ? MAX_DECIMAL_LENGTH : accountCurrency.decimal_digits}
                            value={amount}
                            onChange={(e) => updateamount(e.value!)}
                            className="w-full"
                            prefix={accountCurrency.code + ' '}
                        />
                        <label htmlFor="email">Establecer monto inicial (opcional)</label>
                    </FloatLabel>
                            
                </section>

                <section>
                    <h3>Moneda</h3>

                    <br />

                    <CurrencySelector value={accountCurrency} currencies={currencies} handleSelection={setAccountCurrency}/>
                </section>
            </Dialog>
        </>
    )
}
import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useApp } from "../../../context/AppContext";
import { useToast } from "../../../context/ToastContext";
import { AccountSelector } from "../selectors/AccountSelector";
import {
    Account,
    IncomeType,
    OutcomeType,
    TransactionTypes,
} from "../../../interfaces";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { IncomeTypeSelector } from "../selectors/IncomeTypeSelector";
import { Calendar } from "primereact/calendar";
import { addLocale, locale } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { MAX_DECIMAL_LENGTH } from "../../../constants/app-constants";
import { DOMUtils } from "../../../utils/dom-utils";

locale("es");
addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ],
    monthNamesShort: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
});

export const CreateTransactionSection = () => {
    const dialogsPosition = "center";

    const { accounts, incomeTypes, outcomeTypes } = useApp();

    const { showMessage } = useToast();

    const [dialogsTitle, setDialogsTitle] = useState("Nuevo movimiento");

    const [transactionType, setTransactionType] = useState<TransactionTypes>();
    const [accountSelected, setAccountSelected] = useState<Account>(
        accounts[0]
    );

    const [incomeType, setIncomeType] = useState<IncomeType>(incomeTypes[0]);
    const [outcomeType, setOutcomeType] = useState<OutcomeType>(
        outcomeTypes[0]
    );

    const [transactionAmount, setTransactionAmount] = useState<number>(0);

    const [transactionTitle, setTransactionTitle] =
        useState<string>("Nuevo movimiento");
    const [transactionDescription, setTransactionDescription] =
        useState<string>();
    const [transactionDatetime, setTransactionDatetime] = useState<string>();

    const [transactionDate, setTransactionDate] = useState(new Date());
    const [transactionTime, setTransactionTime] = useState(new Date());

    const [showSection1, setShowSection1] = useState(false);
    const [showSection2, setShowSection2] = useState(false);
    const [showSection3, setShowSection3] = useState(false);
    const [showSection4, setShowSection4] = useState(false);
    const [showSection5, setShowSection5] = useState(false);

    useEffect(() => {
        if (accounts.length) setAccountSelected(accounts[0]);
    }, []);

    const start = () => {
        if (!accounts.length)
            return showMessage({
                detail: "Debe tener al menos una cuenta primero.",
                severity: "warn",
            });

        DOMUtils.addBodyOverflowClass();
        setShowSection1(true);
    };

    const go_1_to_2 = (transactionType: TransactionTypes) => {
        setTransactionType(transactionType);

        setShowSection1(false);
        setShowSection2(true);

        setTimeout(() => {
            if (transactionType === "income") setDialogsTitle("Nuevo Ingreso");
            if (transactionType === "outcome") setDialogsTitle("Nuevo Egreso");
        }, 50);
    };

    const go_2_to_3 = () => {
        setShowSection2(false);
        setShowSection3(true);
    };

    const go_3_to_4 = () => {
        setShowSection3(false);
        setShowSection4(true);
    };

    const go_3_to_2 = () => {
        setShowSection3(false);
        setShowSection2(true);
    };

    const go_2_to_1 = () => {
        setShowSection2(false);
        setShowSection1(true);

        setTimeout(() => {
            setDialogsTitle("Nuevo Movimiento");
        }, 50);
    };

    const section2Footer = () => (
        <div>
            <Button onClick={() => go_2_to_1()} text>
                Atrás
            </Button>
            <Button onClick={() => go_2_to_3()} raised>
                Siguiente
            </Button>
        </div>
    );

    const section3Footer = () => (
        <div className="mt-2">
            <Button onClick={() => go_3_to_2()} text>
                Atrás
            </Button>
            <Button onClick={() => go_3_to_4()} raised>
                Siguiente
            </Button>
        </div>
    );

    function closeDialogs() {
        DOMUtils.removeBodyOverflowClass();

        setShowSection1(false);
        setShowSection2(false);
        setShowSection3(false);

        setTimeout(() => {
            setDialogsTitle("Nuevo Movimiento");
        }, 50);
    }

    return (
        <>
            <Button
                onClick={() => start()}
                className="transaction-button"
                icon="pi pi-plus"
                rounded
                raised
            />

            <Dialog
                header={dialogsTitle}
                visible={showSection1}
                onHide={closeDialogs}
                draggable={false}
                className="w-11 xl:w-6"
                position={dialogsPosition}
            >
                <section>
                    <h3>Tipo de Movimiento</h3>

                    <div className="mx-auto flex flex-col md:flex-row justify-content-center gap-4">
                        <Button
                            onClick={() => go_1_to_2("income")}
                            severity="success"
                            className="w-full md:w-10rem font-medium"
                        >
                            <p className="text-center block w-full m-0">
                                Ingreso
                            </p>
                        </Button>
                        <Button
                            onClick={() => go_1_to_2("outcome")}
                            severity="danger"
                            className="w-full md:w-10rem font-medium"
                        >
                            <p className="text-center block w-full m-0">
                                Egreso
                            </p>
                        </Button>
                    </div>
                </section>
            </Dialog>

            <Dialog
                header={dialogsTitle}
                visible={showSection2}
                onHide={closeDialogs}
                draggable={false}
                className="w-11 xl:w-6"
                position={dialogsPosition}
                footer={section2Footer}
            >
                <section>

                    <br />

                    <AccountSelector
                        value={accountSelected}
                        accounts={accounts}
                        handleSelection={setAccountSelected}
                    />

                    <br />
                    <br />

                    {/* @ts-ignore */}
                    <FloatLabel>
                        <InputNumber
                            id="amount"
                            min={0.0}
                            minFractionDigits={
                                !accountSelected?.currency.decimal_digits
                                    ? 2
                                    : accountSelected.currency.decimal_digits
                            }
                            maxFractionDigits={
                                !accountSelected?.currency.decimal_digits
                                    ? MAX_DECIMAL_LENGTH
                                    : accountSelected.currency.decimal_digits
                            }
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.value!)}
                            className="w-full"
                            prefix={accountSelected?.currency.code + " "}
                        />
                        <label htmlFor="amount">Establecer monto</label>
                    </FloatLabel>

                    <br />
                    <br />

                    <IncomeTypeSelector
                        value={incomeType}
                        incomeTypes={incomeTypes}
                        handleSelection={setIncomeType}
                    />
                </section>
            </Dialog>

            <Dialog
                header={dialogsTitle}
                visible={showSection3}
                onHide={closeDialogs}
                draggable={false}
                className="w-11 xl:w-6"
                position={dialogsPosition}
                footer={section3Footer}
            >
                <section>
                    <h3>Información</h3>

                    <br />

                    {/* @ts-ignore */}
                    <FloatLabel>
                        <InputText
                            id="title"
                            value={transactionTitle}
                            onChange={(e) =>
                                setTransactionTitle(e.target.value)
                            }
                            className="w-full"
                        />
                        <label htmlFor="title">Concepto</label>
                    </FloatLabel>

                    <br />

                    <section>
                        <h3>Fecha y Hora</h3>

                        <br />

                        <div className="flex flex-col md:flex-row gap-2 justify-content-center">
                            {/* @ts-ignore */}
                            <FloatLabel>
                                <Calendar
                                    inputId="date"
                                    locale="es"
                                    dateFormat="dd/mm/yy"
                                    showIcon
                                    value={transactionDate}
                                    onChange={(e) =>
                                        setTransactionDate(e.value as any)
                                    }
                                    className="w-full"
                                />
                                <label htmlFor="date">Fecha</label>
                            </FloatLabel>

                            <br />

                            {/* @ts-ignore */}
                            <FloatLabel>
                                <Calendar
                                    inputId="time"
                                    locale="es"
                                    timeOnly
                                    hourFormat="12"
                                    showIcon
                                    icon={() => <i className="pi pi-clock" />}
                                    value={transactionTime}
                                    onChange={(e) =>
                                        setTransactionTime(e.value as any)
                                    }
                                    className="w-full"
                                />
                                <label htmlFor="time">Hora</label>
                            </FloatLabel>
                        </div>
                    </section>

                    {/* @ts-ignore */}
                    {/* <FloatLabel>
                        <InputTextarea
                            id="description"
                            value={transactionDescription}
                            onChange={(e) => setTransactionDescription(e.target.value)}
                            rows={5}
                            autoResize
                            className="w-full"
                        />
                        <label htmlFor="description">Descripción del movimiento (opcional)</label>
                    </FloatLabel> */}
                </section>
            </Dialog>
        </>
    );
};

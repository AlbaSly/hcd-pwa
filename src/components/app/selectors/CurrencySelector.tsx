import { Dropdown, DropdownProps } from "primereact/dropdown";
import { Currency } from "../../../interfaces";
import { FloatLabel } from "primereact/floatlabel";

type CurrencySelectorProps = {
    value: Currency | null;
    currencies: Currency[];
    handleSelection: (value: Currency) => void;
};
export const CurrencySelector = (props: CurrencySelectorProps) => {
    const { value, currencies, handleSelection } = props;

    const selectedCurrencyTemplate = (
        option: Currency,
        props: DropdownProps
    ) => {
        return (
            <div className="flex gap-4 text-sm lg:text-base">
                <p className="font-bold">{option.code}</p>
                <p>
                    {option.name}{" "}
                    {option.symbol_native && (
                        <span>({option.symbol_native})</span>
                    )}
                </p>
            </div>
        );
    };

    const currencyOptionTemplate = (option: Currency) => {
        return (
            <div className="flex text-sm lg:text-base">
                <div className="flex gap-4">
                    <p className="font-bold">{option.code}</p>
                    <p>
                        {option.name}{" "}
                        {option.symbol_native && (
                            <span>{option.symbol_native}</span>
                        )}
                    </p>
                </div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <p className="text-center text-sm lg:text-base">
                <span className="font-bold">{value?.code}</span> Seleccionado.
            </p>
        );
    };

    return (
        <div>
            {/* @ts-ignore */}
            <FloatLabel>
                <Dropdown
                    id="currency"
                    value={value}
                    onChange={(e) => handleSelection(e.value)}
                    options={currencies}
                    optionLabel="name"
                    placeholder="Seleccionar Moneda"
                    filter
                    filterBy="code"
                    valueTemplate={selectedCurrencyTemplate}
                    itemTemplate={currencyOptionTemplate}
                    panelFooterTemplate={panelFooterTemplate}
                    className="w-full p-0"
                />
                <label htmlFor="currency">Seleccionar Moneda</label>
            </FloatLabel>
        </div>
    );
};

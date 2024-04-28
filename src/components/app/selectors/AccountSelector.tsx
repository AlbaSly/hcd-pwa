import { Dropdown, DropdownProps } from "primereact/dropdown";
import { Account } from "../../../interfaces";
import { FloatLabel } from "primereact/floatlabel";
import { Tag } from "primereact/tag";

type AccountSelectorProps = {
    value?: Account;
    accounts: Account[];
    handleSelection: (value: Account) => void;
};
export const AccountSelector = (props: AccountSelectorProps) => {
    const { value, accounts, handleSelection } = props;

    const selectedAccountTemplate = (option: Account, props: DropdownProps) => {
        if (option) return (
            <div className="flex gap-2 align-content-center">
                <p className="m-0 font-medium text-gray-700">{option.name}</p>
                <p className="m-0">(<span>{option.currency.code}</span>)</p>
            </div>
        );
    };

    const accountOptionTemplate = (option: Account) => {
        return (
            <div className="flex gap-4 align-content-center">
                <div className="flex align-items-center">
                    <Tag severity="success" value={option.periodicity.name}/>    
                </div>
                <p className="font-medium text-gray-700">{option.name}</p>
                <p>(<span>{option.currency.code}</span>)</p>
            </div>
        )
    };

    const panelFooterTemplate = () => {
        if (value)
            return (
                <p className="text-center text-sm lg:text-base">
                    <span className="font-bold">
                        "{value?.name}" Seleccionada.
                    </span>
                </p>
            );
    };

    return (
        <div>
            {/* @ts-ignore */}
            <FloatLabel>
                <Dropdown
                    id="account"
                    value={value}
                    onChange={(e) => handleSelection(e.value)}
                    options={accounts}
                    optionLabel="name"
                    placeholder="Seleccionar Cuenta"
                    filter
                    filterBy="name"
                    valueTemplate={selectedAccountTemplate}
                    itemTemplate={accountOptionTemplate}
                    panelFooterTemplate={panelFooterTemplate}
                    className="w-full p-0"
                />
                <label htmlFor="account">Seleccionar cuenta</label>
            </FloatLabel>
        </div>
    );
};

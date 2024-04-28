import { Dropdown, DropdownProps } from "primereact/dropdown";
import { IncomeType } from "../../../interfaces";
import { FloatLabel } from "primereact/floatlabel";

type IncomeTypeSelectorProps = {
    value?: IncomeType;
    incomeTypes: IncomeType[];
    handleSelection: (value: IncomeType) => void;
};
export const IncomeTypeSelector = (props: IncomeTypeSelectorProps) => {
    const { value, incomeTypes, handleSelection } = props;

    const selectedIncomeTypeTemplate = (
        option: IncomeType,
        props: DropdownProps
    ) => {
        if (option)
            return (
                <div>
                    <p className="m-0">{option.name}</p>
                </div>
            );
    };

    const incomeTypeOptionTemplate = (option: IncomeType) => {
        return (
            <div>
                <p className="m-0">{option.name}</p>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        if (value)
            return (
                <p className="px-4 text-center text-sm lg:text-base">
                    Categoría {' '}
                    <span className="font-bold">"{value.name}"</span> {' '}
                    seleccionada.
                </p>
            );
    };

    return (
        <div>
            {/* @ts-ignore */}
            <FloatLabel>
                <Dropdown 
                    id="type"
                    value={value}
                    onChange={(e) => handleSelection(e.value)}
                    options={incomeTypes}
                    optionLabel="name"
                    placeholder="Seleccionar categoría"
                    filter
                    filterBy="name"
                    valueTemplate={selectedIncomeTypeTemplate}
                    itemTemplate={incomeTypeOptionTemplate}
                    panelFooterTemplate={panelFooterTemplate}
                    className="w-full"
                />
                <label htmlFor="type">Seleccionar categoría</label>
            </FloatLabel>
        </div>
    )
};

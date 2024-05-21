import { Dropdown } from "primereact/dropdown";
import { TransactionCategory } from "../../../interfaces"
import { FloatLabel } from "primereact/floatlabel";

type TransactionCategorySelectorProps = {
    value?: TransactionCategory;
    options: TransactionCategory[];
    handleSelection: (value: TransactionCategory) => void;
}
export const TransactionCategorySelector = (props: TransactionCategorySelectorProps) => {
    const {
        value,
        options,
        handleSelection,
    } = props;

    const selectedTransactionTemplate = (
        option: TransactionCategory,
        // props: DropdownProps,
    ) => {
        if (option) return (
            <div>
                <p className="m-0">{option.name}</p>
            </div>
        )
    }

    const transactionCategoryOptionTemplate = (
        option: TransactionCategory,
    ) => {
        return (
            <div>
                <p className="m-0">{option.name}</p>
            </div>
        )
    }

    const panelFooterTemplate = () => {
        if (value) return (
            <p className="px-4 text-center text-sm lg:text-base">
                Categoría {' '}
                <span className="font-bold">"{value.name}"</span> {' '}
                seleccionada.
            </p>
        )
    }

    return (
        <div>
            {/* @ts-ignore */}
            <FloatLabel>
                <Dropdown 
                    id="type"
                    value={value}
                    onChange={(e) => handleSelection(e.value)}
                    options={options}
                    optionLabel="name"
                    placeholder="Seleccionar Categoría"
                    filter
                    filterBy="name"
                    valueTemplate={selectedTransactionTemplate}
                    itemTemplate={transactionCategoryOptionTemplate}
                    panelFooterTemplate={panelFooterTemplate}
                    className="w-full"
                />
                <label htmlFor="type">Seleccionar categoría</label>
            </FloatLabel>
        </div>
    )
}
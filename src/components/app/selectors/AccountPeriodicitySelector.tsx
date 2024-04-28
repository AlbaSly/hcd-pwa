import { Button } from "primereact/button";
import { Periodicity } from "../../../interfaces"

type AccountPeriodicitySelectorProps = {
    value: Periodicity;
    periodicities: Periodicity[];
    handleSelection: (value: Periodicity) => void;
}
export const AccountPeriodicitySelector = (props: AccountPeriodicitySelectorProps) => {
    const {
        value,
        periodicities,
        handleSelection
    } = props;

    return (
        <div className="mx-auto flex justify-content-center gap-2 ">
            {
                periodicities.map((periodicity, index) => (
                    <Button 
                        key={index} 
                        onClick={() => handleSelection(periodicity)}
                        outlined={periodicity.id !== value.id}
                    >
                        {periodicity.name}
                    </Button>
                ))
            }
        </div>
    )
}
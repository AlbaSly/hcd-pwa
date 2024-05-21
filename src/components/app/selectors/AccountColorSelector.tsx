import { Button } from "primereact/button";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";

type AccountColorSelectorProps = {
    value: string;
    handleSelection: (value: string) => void;
};
export const AccountColorSelector = (props: AccountColorSelectorProps) => {
    const { value, handleSelection } = props;

    const SOME_COLORS: string[] = [
        "ffc0cbff", // Rosa pastel
        "ffff99ff", // Amarillo pastel
        "90ee90ff", // Verde pastel
        "87ceebff", // Azul cielo pastel
        "e6e6faff", // Lavanda pastel
        "ffdab9ff", // Melocotón pastel
        "7fffd4ff", // Aguamarina pastel
        "d8bfd8ff", // unnamed color
    ];

    return (
        <div className="flex flex-col gap-2 mt-2 overflow-hidden">
            <div className="flex justify-content-center align-items-center gap-2 overflow-hidden">
                <ColorPicker
                    format="hex"
                    value={value}
                    onChange={(e: ColorPickerChangeEvent) =>
                        handleSelection(e.value as any)
                    }
                    className="mr-2"
                />
                <p className="text-gray-500">Personalizar...</p>
            </div>
            <div className="grid gap-2 justify-content-center align-items-center overflow-hidden">
                {SOME_COLORS.map((color, index) => (
                    <Button
                        key={index}
                        onClick={() => handleSelection(color)}
                        rounded
                        // icon={color === value ? "pi pi-check" : ""}
                        className="my-2"
                        style={{
                            backgroundColor: `#${color}`,
                            border: 'none',
                            color: 'black'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

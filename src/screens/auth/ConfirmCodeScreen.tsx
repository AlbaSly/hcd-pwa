import { Dialog } from "primereact/dialog"
import { AuthTitles } from "../../components/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { Button } from "primereact/button";

export const ConfirmCodeScreen = () => {

    const [ showDialog, setShowDialog ] = useState(true);
    const [ code, setCode ] = useState<string>("");
    const [ fetchingResponse, setFetchingResponse ] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleOnHide = () => {

        if (!showDialog) return;
        
        setShowDialog(false);

        setTimeout(() => {
            navigate('/');
        }, 250);
    }

    const confirmCode = () => {
        if (fetchingResponse) return;

        setFetchingResponse(true);

        setTimeout(() => {
            setFetchingResponse(false);
            alert('ok');
        }, 1000);
    }

    return (
        <div className="h-full">
            <AuthTitles title="Código de Confirmación" />

            <Dialog
                header="Código enviado"
                visible={showDialog}
                onHide={handleOnHide}
                className="container md:w-6"
            >
                <p>Se ha enviado un código de recuperación a <span>{'email@email.com'}</span>.</p>
                <p>Digite el código en los recuadros de abajo:</p>

                <div className="my-4 flex justify-content-center">
                    <OTPInput
                        containerStyle={{ gap: "8px" }}
                        inputStyle={{ width: "32px", height: "32px" }}
                        numInputs={6}
                        renderSeparator={<span> </span>}
                        value={code}
                        onChange={(value) => setCode(value)}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>

                <Button
                    onClick={confirmCode}
                    raised
                    loading={fetchingResponse}
                    className="block mx-auto mt-4 w-full md:w-8 flex justify-content-center gap-2 font-medium"
                >
                    Confirmar Código
                </Button>
            </Dialog>
        </div>
    )
}
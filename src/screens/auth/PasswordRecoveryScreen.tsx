import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import OTPInput from "react-otp-input";

import { AuthTitles } from "../../components/auth";


export const PasswordRecoveryScreen = () => {

    const [email, setEmail] = useState("");
    const [fetchingResponse, setFetchingResponse] = useState(false);

    const updateEmail = (value: string) => setEmail(value);

    const navigate = useNavigate();

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        if (fetchingResponse) return;

        setFetchingResponse(true);

        setTimeout(() => {
            setFetchingResponse(false);
            navigate('/auth/confirm-code');
        }, 500);
    };


    return (
        <div className="h-full overflow-hidden hide-scroll__faster">
            <AuthTitles
                title="Recuperar cuenta"
                info="Ingrese su correo electrónico para recibir un código de recuperación."
            />

            <Card
                className={[
                    "animate__animated animate__fadeInUp animate__faster",
                    "container lg:w-6 p-4",
                ].join(" ")}
            >
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="flex flex-column" style={{ gap: "30px" }}>
                        <FloatLabel>
                            <InputText
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => updateEmail(e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="email">Correo Electrónico</label>
                        </FloatLabel>
                    </div>

                    <div className="flex flex-col mt-4">
                        <Button
                            type="submit"
                            raised
                            loading={fetchingResponse}
                            className="w-full md:w-4 mx-auto my-2 flex justify-content-center gap-2 font-medium"
                        >
                            Enviar Código
                        </Button>
                    </div>

                    <Link
                        to={"/auth/login"}
                        className="block mt-2 text-center text-gray-500 no-underline hover:underline"
                    >
                        Regresar
                    </Link>
                </form>
            </Card>
        </div>
    );
};

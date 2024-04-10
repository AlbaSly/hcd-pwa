import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";

export const PasswordRecoveryScreen = () => {
    const [email, setEmail] = useState("");

    const updateEmail = (value: string) => setEmail(value);

    return (
        <div className="fit-parent-size flex-col center-center">
            <div className="mb-8 text-center">
                <h1 style={{ color: "white" }}>Recuperar Cuenta</h1>
                <p style={{ color: "white" }} className="mt-4">
                    Ingrese el correo electrónico vinculado a su cuenta.
                </p>
            </div>

            <Card
                className={[
                    "animate__animated animate__fadeInUp animate__faster",
                    "container lg:w-6 p-6",
                ].join(" ")}
            >
                <form className="py-4">
                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="email" className="font-semibold">
                            Correo
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => updateEmail(e.target.value)}
                            className="p-inputtext-lg p-4 text-2xl"
                            placeholder="ej: john.doe@email.com"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="block w-full md:w-4 mx-auto mt-8 p-4 text-2xl"
                    >
                        Enviar Código
                    </Button>

                    <Link to={'..'} className="block text-center mt-4">Regresar</Link>
                </form>
            </Card>
        </div>
    );
};

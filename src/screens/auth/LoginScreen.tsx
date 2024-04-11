import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { AuthTitles } from "../../components/auth";


export const LoginScreen = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const updateEmail = (value: string) => setCredentials({ ...credentials, email: value });
    const updatePassword = (value: string) => setCredentials({ ...credentials, password: value });

    const navigate = useNavigate();
    const gotoSignUpScreen = () => navigate("/auth/signup");

    const connectWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            /**Handle response */
            console.log(tokenResponse);
        },
        onError: () => {
            /**Handle error */
        },
        flow: 'auth-code',
    });

    return (
        <div className="h-full flex flex-column align-items-center justify-content-center">
            <AuthTitles
                title="Bienvenido"
                info="Inicie sesión para acceder a la aplicación."
            />

            <Card
                className={[
                    "animate__animated animate__fadeInUp animate__faster",
                    "container lg:w-6 p-8",
                ].join(" ")}
            >

                <Button
                    onClick={() => connectWithGoogle()}
                    icon="pi pi-google"
                    className="flex justify-content-center gap-2 mx-auto w-full md:w-4"
                    size="large"
                    raised
                    severity="danger"
                >
                    Acceder con Google
                </Button>

                <p className="text-center my-4">ó</p>
                <hr className="mb-8" />

                <form autoComplete="off">
                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="email" className="font-semibold">
                            Correo Electrónico
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => updateEmail(e.target.value)}
                            className="p-inputtext-lg p-4 text-2xl"
                            placeholder="ej: john.doe@email.com"
                        />
                    </div>

                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="password" className="font-semibold">
                            Contraseña
                        </label>
                        <Password
                            id="password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => updatePassword(e.target.value)}
                            placeholder="Su contraseña"
                            feedback={false}
                            // weakLabel="Contraseña débil"
                            // mediumLabel="Contraseña segura"
                            // strongLabel="Contraseña muy segura"
                            className="toggleMask"
                            inputClassName="p-4 text-2xl w-full"
                            toggleMask
                        />
                    </div>

                    <Link to={"/auth/password-recovery"}>
                        ¿Contraseña Olvidada?
                    </Link>

                    <div className="flex flex-col md:flex-row-reverse mt-8">
                        <Button
                            type="submit"
                            className="block w-full md:w-4 mx-auto my-2 mt-8 p-4 text-2xl"
                            raised
                        >
                            Acceder
                        </Button>

                        <Button
                            onClick={() => gotoSignUpScreen()}
                            severity="info"
                            type="submit"
                            className="block w-full md:w-4 mx-auto my-2 mt4 p-4 text-2xl"
                            raised
                        >
                            Crear una Cuenta
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

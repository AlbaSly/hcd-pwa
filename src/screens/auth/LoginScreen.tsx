import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { AuthTitles } from "../../components/auth";
import axios from "axios";
import { AuthService } from "../../services/AuthService";
import { useToast } from "../../context/ToastContext";

export const LoginScreen = () => {

    const {
        showMessage,
    } = useToast();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const updateEmail = (value: string) => setCredentials({ ...credentials, email: value });
    const updatePassword = (value: string) => setCredentials({ ...credentials, password: value });

    const navigate = useNavigate();
    const goToSignUpScreen = () => navigate("/auth/signup");

    const connectWithGoogle = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            /**Handle response */
            const authService = new AuthService();

            authService.connectWGoogle(tokenResponse.access_token)
            .then(result => {
                showMessage({
                    detail: result,
                    severity: 'success'
                });
            })
            .catch(error => {
                console.log(error);
            });
        },
        onError: (error) => {
            /**Handle error */
            console.log(error.error_description);
        },
    });

    return (
        <div className="h-full overflow-hidden hide-scroll__faster">
            <AuthTitles
                title="Bienvenido"
                info="Inicie Sesión para acceder a la aplicación"
            />

            <Card
                className={[
                    "animate__animated animate__fadeInUp animate__faster",
                    "container lg:w-6 p-4",
                ].join(" ")}
            >
                <form autoComplete="off" >
                    <div className="flex flex-column" style={{gap: '30px'}}>
                        {/* @ts-ignore */}
                        <FloatLabel>
                            <InputText
                                type="text"
                                id="email"
                                value={credentials.email}
                                onChange={(e) => updateEmail(e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="email">Correo Electrónico</label>
                        </FloatLabel>

                        {/* @ts-ignore */}
                        <FloatLabel>
                            <Password 
                                type="password"
                                id="password"
                                value={credentials.password}
                                onChange={(e) => updatePassword(e.target.value)}
                                feedback={false}
                                className="w-full"
                                inputClassName="w-full"
                                toggleMask
                            />
                            <label htmlFor="password">Contraseña</label>
                        </FloatLabel>
                    </div>

                    <Link to={"/auth/password-recovery"} className="block my-2 text-gray-500 no-underline hover:underline">¿Contraseña Olvidada?</Link>

                    <div className="flex flex-col md:flex-row-reverse mt-4">
                        <Button 
                            type="submit"
                            raised
                            className="block w-full md:w-4 mx-auto my-2 font-medium"
                        >
                            Acceder
                        </Button>

                        <Button 
                            type="button"
                            onClick={() => goToSignUpScreen()}
                            severity="info"
                            raised
                            className="block w-full md:w-4 mx-auto my-2 font-medium"
                        >
                            Soy Nuevo
                        </Button>
                    </div>

                    <hr className="my-4 text-gray-200"/>

                    <Button 
                        type="button"
                        onClick={() => connectWithGoogle()}
                        icon="pi pi-google"
                        severity="danger"
                        raised
                        size="small"
                        className="block w-full md:w-6 mx-auto flex justify-content-center gap-2"
                    >
                        Acceder con Google
                    </Button>
                </form>
            </Card>
        </div>
    );
};

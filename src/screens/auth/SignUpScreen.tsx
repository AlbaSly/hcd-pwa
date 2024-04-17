import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { AuthTitles } from "../../components/auth";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FloatLabel } from "primereact/floatlabel";
import axios from "axios";

export const SignUpScreen = () => {
    const [userFormData, setUserFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    });

    const updateName = (value: string) => setUserFormData({ ...userFormData, name: value });
    const updateLastName = (value: string) => setUserFormData({ ...userFormData, lastName: value });
    const updateEmail = (value: string) => setUserFormData({ ...userFormData, email: value });
    const updatePassword = (value: string) => setUserFormData({ ...userFormData, password: value });
    const updateRepeatedPassword = (value: string) => setUserFormData({ ...userFormData, repeatedPassword: value });

    const connectWithGoogle = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            /**Handle response */
            axios.get(import.meta.env.VITE_API_URL + `/google-auth/connect?access_token=${tokenResponse.access_token}&auth_method=${'signup'}`).then(response => {
                console.log(response);
            })
            .catch(e => console.log(e));
        },
        onError: (error) => {
            /**Handle error */
            console.log(error.error_description);
        },
    });

    return (
        <>
            <AuthTitles 
                title="Registrarse"
                info="Crea una cuenta para registrarte en la aplicación"
            />

            <Card
                className={[
                    "animate__animated animate__fadeInUp animate__faster",
                    "container lg:w-6 p-4",
                ].join(" ")}            
            >
                <form autoComplete="off">

                    <Button 
                        type="button"
                        onClick={() => connectWithGoogle()}
                        icon="pi pi-google"
                        severity="danger"
                        raised
                        size="small"
                        className="block w-full md:w-6 mx-auto flex justify-content-center gap-2"
                    >
                        Conectar con Google
                    </Button>

                    <hr className="my-4 text-gray-200"/>

                    <div className="flex flex-column" style={{gap: '30px'}}>
                        <FloatLabel>
                            <InputText
                                type="text"
                                id="name"
                                value={userFormData.name}
                                onChange={(e) => updateName(e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="name">Nombre(s)</label>
                        </FloatLabel>

                        <FloatLabel>
                            <InputText
                                type="text"
                                id="lastname"
                                value={userFormData.lastName}
                                onChange={(e) => updateLastName(e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="lastname">Apellido(s)</label>
                        </FloatLabel>

                        <FloatLabel>
                            <InputText
                                type="email"
                                id="email"
                                value={userFormData.email}
                                onChange={(e) => updateEmail(e.target.value)}
                                className="w-full"
                            />
                            <label htmlFor="email">Correo Electrónico</label>
                        </FloatLabel>

                        <FloatLabel>
                            <Password 
                                type="password"
                                id="password"
                                value={userFormData.password}
                                onChange={(e) => updatePassword(e.target.value)}
                                feedback={false}
                                className="w-full"
                                inputClassName="w-full"
                                toggleMask
                            />
                            <label htmlFor="password">Contraseña</label>
                        </FloatLabel>

                        <FloatLabel>
                            <Password 
                                type="password"
                                id="repeated-password"
                                value={userFormData.repeatedPassword}
                                onChange={(e) => updateRepeatedPassword(e.target.value)}
                                feedback={false}
                                className="w-full"
                                inputClassName="w-full"
                                toggleMask
                            />
                            <label htmlFor="repeated-password">Repetir contraseña</label>
                        </FloatLabel>
                    </div>

                    <div className="flex flex-col mt-4">
                        <Button 
                            type="submit"
                            raised
                            className="block w-full md:w-4 mx-auto my-2 font-medium"
                        >
                            Crear Cuenta
                        </Button>
                    </div>

                    <Link to={"/auth/login"} className="block my-2 text-center text-gray-500 no-underline hover:underline">Regresar</Link>
                </form>
            </Card>
        </>
    );
};

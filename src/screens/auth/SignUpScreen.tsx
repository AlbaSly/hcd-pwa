import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { AuthHeadings } from "../../components/auth";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import { GoogleAuthService } from "../../services";
import { useGoogleLogin } from "@react-oauth/google";



export const SignUpScreen = () => {

    const [ userFormData, setUserFormData ] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    });

    const updateName = (value: string) => setUserFormData({...userFormData, name: value});
    const updateLastName = (value: string) => setUserFormData({...userFormData, lastName: value});
    const updateEmail = (value: string) => setUserFormData({...userFormData, email: value});
    const updatePassword = (value: string) => setUserFormData({...userFormData, password: value});
    const updateRepeatedPassword = (value: string) => setUserFormData({...userFormData, repeatedPassword: value});

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
        <div className="h-full overflow-y-auto">
            <AuthHeadings
                title="Registrarse"
                info="Crea una cuenta para entrar a la aplicación."
            />

            <Card
                className={[
                    "animate__animated animate__fadeInUp animate__faster",
                    "container md:w-6 p-8 mb-4",
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
                    Registrar con Google
                </Button>

                <p className="text-center my-4">ó</p>
                <hr className="mb-8" />

                {/* FORMULARIO */}
                <form autoComplete="off">
                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="name" className="font-semibold">
                            Nombre(s)
                        </label>
                        <InputText
                            id="name"
                            name="name"
                            type="name"
                            value={userFormData.name}
                            onChange={(e) => updateName(e.target.value)}
                            className="p-inputtext-lg p-4 text-2xl"
                            placeholder="John"
                        />
                    </div>

                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="lastName" className="font-semibold">
                            Apellido(s)
                        </label>
                        <InputText
                            id="lastName"
                            name="lastName"
                            type="lastName"
                            value={userFormData.lastName}
                            onChange={(e) => updateLastName(e.target.value)}
                            className="p-inputtext-lg p-4 text-2xl"
                            placeholder="Doe"
                        />
                    </div>

                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="email" className="font-semibold">
                            Correo Electrónico
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            type="email"
                            value={userFormData.email}
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
                            value={userFormData.password}
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

                    <div className="flex flex-column gap-2 my-4">
                        <label htmlFor="repeatedPassword" className="font-semibold">
                            Repetir la contraseña
                        </label>
                        <Password
                            id="repeatedPassword"
                            name="repeatedPassword"
                            type="repeatedPassword"
                            value={userFormData.password}
                            onChange={(e) => updateRepeatedPassword(e.target.value)}
                            placeholder="Confirmar contraseña"
                            feedback={false}
                            // weakLabel="Contraseña débil"
                            // mediumLabel="Contraseña segura"
                            // strongLabel="Contraseña muy segura"
                            className="toggleMask"
                            inputClassName="p-4 text-2xl w-full"
                            toggleMask
                        />
                    </div>


                    <div className="flex flex-col md:flex-row-reverse mt-8">
                        <Button
                            type="submit"
                            className="block w-full md:w-4 mx-auto my-2 mt-8 p-4 text-2xl"
                            raised
                        >
                            Crear Cuenta
                        </Button>
                    </div>

                </form>

                <Link to={'/auth/login'} className="text-center block mt-4">Regresar</Link>
            </Card>
        </div>
    );
};

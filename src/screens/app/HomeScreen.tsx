import { Button } from "primereact/button";
import { AppTitle } from "../../components/app"

import AccountsList from "../../components/app/AccountsList";
import { CreateAccountSection, CreateTransactionSection } from "../../components/app/sections";
import { useAuth } from "../../context/AuthContext";

export const HomeScreen = () => {

    const {
        userInfo
    } = useAuth();

    return (
        <>
            <AppTitle>
                <h1>Buenos días, <span>{userInfo.name}</span></h1>
            </AppTitle>

            <CreateTransactionSection />

            <main>
                <section className="container mx-auto mb-4">
                    <div className="flex justify-content-center align-items-center gap-4">
                        <h2>Mis cuentas</h2>

                        <CreateAccountSection />
                    </div>

                    <AccountsList />
                </section>

                <section className="container mx-auto mb-4">
                    <h2>Reciente</h2>

                    <div className="container mx-auto flex flex-col gap-3 mb-2">

                        <div className="card p-3 bg-white border-round shadow-2">
                            <p className="text-left m-0 text-base font-medium text-gray-500">Categoría: Comida</p>
                            <div className="flex flex-column-reverse md:flex-row align-items-center justify-content-between my-2">
                                <div className="flex align-items-center gap-4">
                                    <Button icon="pi pi-pen-to-square" raised text className="text-gray-500" style={{height: '32px', width: '32px'}}/>
                                    <p className="text-xl font-bold text-gray-600">Comida</p>
                                </div>
                                <div className="text-2xl font-bold text-gray-700 flex align-items-center gap-2">
                                    <i className="pi pi-chevron-down text-red-500 font-bold text-3xl"></i>
                                    <p>$279.79 MXN</p>
                                </div>
                            </div>
                        </div>


                        <div className="card p-3 bg-white border-round shadow-2">
                            <p className="text-left m-0 text-base font-medium text-gray-500">Categoría: Regalos</p>
                            <div className="flex flex-column-reverse md:flex-row  align-items-center justify-content-between my-2">
                                <div className="flex align-items-center gap-4">
                                    <Button icon="pi pi-pen-to-square" raised text className="text-gray-500" style={{height: '32px', width: '32px'}}/>
                                    <p className="text-xl font-bold text-gray-600">Regalo Cumple.</p>
                                </div>
                                <p className="text-2xl font-bold text-gray-700"><i className="pi pi-chevron-up text-green-500 font-bold"></i> $0.0001 BTC</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
import { ProgressSpinner } from "primereact/progressspinner"

export const AuthProviderLoader = () => {
    return (
        <div className="w-screen h-screen flex justify-content-center align-items-center">
            <div className="flex flex-column justify-content-center align-content-center">
                <ProgressSpinner />
                <h3>Validando Información...</h3>
            </div>
        </div>
    )
}
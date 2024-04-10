type AuthTitlesProps = {
    title: string;
    info?: string;
}

/** Nota de Alex...
 se modificó el nombre del archivo así como del const por AuthTitles (antes llamado AuthHeadings)
 De igual manera se hicieron las modificaciones en los archivos en los que se mandaba a llamar o se importaba la
 clase AuthHeadings (LoginScreen, index y SignUpScreen)
 */

/**
 * Componente para los encabezados de las pantallas Auth que muestra un título y una info (opcional) dada.
 * @param props Props del tipo AuthTitlesProps
 * @returns JSX.Element
 */
export const AuthTitles = ({ title, info }: AuthTitlesProps) => {

    return (
        <div className="my-4 text-center">
            <h1 style={{ color: "white" }}>{title}</h1>
            {
                info && (
                    <p style={{ color: "white" }} className="mt-4">
                        {info}
                    </p>
                )
            }
        </div>
    )
}
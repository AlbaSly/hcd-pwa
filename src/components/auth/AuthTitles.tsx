type Props = {
    title: string;
    info?: string;
}
/**
 se modificó el nombre del archivo así como del const por AuthTitles (antes llamado AuthHeadings)
 De igual manera se hicieron las modificaciones en los archivos en los que se mandaba a llamar o se importaba la
 clase AuthHeadings (LoginScreen, index y SignUpScreen)
 */

export const AuthTitles = ({ title, info }: Props) => {

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
type Props = {
    title: string;
    info?: string;
}
export const AuthHeadings = ({title, info}: Props) => {

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
import {Link} from "react-router-dom";

export const IndexPage = () => {
    return (
        <>
            <h1>Index</h1>

            <Link to={'/app/test'}>Go to App Test Page</Link>

            <hr/>

            <Link to={'/auth/test'}>Go to Auth Test Page</Link>
        </>
    )
}
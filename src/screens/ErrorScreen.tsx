import {Link} from "react-router-dom";

export const ErrorScreen = () => {
    return (
        <>
            <h1>Not Found</h1>
            <Link to={'/'}>Go Back</Link>
        </>
    );
};
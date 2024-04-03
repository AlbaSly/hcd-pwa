import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const AuthLayout = () => {
    return (
        <>
            <h1>AuthLayout</h1>
            <ToastContainer />

            <Outlet />
        </>
    );
};

export default AuthLayout;
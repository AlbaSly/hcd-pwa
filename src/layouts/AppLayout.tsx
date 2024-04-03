import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const AppLayout = () => {
    return (
        <>
            <h1>AppLayout</h1>
            <ToastContainer />

            <Outlet/>
        </>
    );
};

export default AppLayout;
import { useEffect, useState } from "react";
import {Outlet} from "react-router-dom";
import { LayoutLoader } from "../components";

const AppLayout = () => {

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const handleDOMLoad = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(handleDOMLoad);
        }
    }, []);

    if (loading) return (
        <LayoutLoader />
    )

    return (
        <>
            <h1>AppLayout</h1>

            <Outlet/>
        </>
    );
};

export default AppLayout;
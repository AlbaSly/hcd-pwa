import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { LayoutLoader } from "../components";


/**
 * Layout para renderizar las rutas relacionadas al módulo App
 * @returns JSX.Element
 */
const AppLayout = () => {

    const [ loading, setLoading ] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const handleDOMLoad = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(handleDOMLoad);
        }
    }, []);

    useEffect(() => {
        scrollTo({top: 0});
    }, [location]);

    
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
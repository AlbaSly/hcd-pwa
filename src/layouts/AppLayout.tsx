import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { LayoutLoader } from "../components";
import { BottomNavbar } from "../components/layout/Navbar";
import { SidebarMenu } from "../components/layout/Sidebar";
import { ScrollPanel } from "primereact/scrollpanel";


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
        <div className="bg-gray-100 relative h-screen">
            <SidebarMenu location={location}/>
            
            <ScrollPanel id="app-scroll-panel">
                <Outlet />  
            </ScrollPanel>

            <BottomNavbar location={location} />
        </div>
    );
};

export default AppLayout;
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { GoogleAuthService } from "../services";
import { LayoutLoader, ScreenContainer } from "../components";

/**
 * Layout para renderizar las rutas relacionadas al módulo Auth
 * @returns JSX.Element
 */
const AuthLayout = () => {
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const clientId = GoogleAuthService.getClientId();

    useEffect(() => {
        const handleDOMLoad = setTimeout(() => {
            setLoading(false);
        }, 1250);

        return () => {
            clearTimeout(handleDOMLoad);
        };
    }, []);

    useEffect(() => {
        scrollTo({ top: 0 });
    }, [location]);

    if (loading) return <LayoutLoader />;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {/* Background */}
            <div className="auth-layout__background">
                <div className="auth-layout__background-gradient"></div>
            </div>

            <div className="h-screen w-screen overflow-y-auto">
                <Outlet />
            </div>
        </GoogleOAuthProvider>
    );
};

export default AuthLayout;

import {Outlet, useLocation} from "react-router-dom";

import { LayoutLoader, ScreenContainer } from "../components";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleAuthService } from "../services";


const AuthLayout = () => {

    const [ loading, setLoading ] = useState(true);

    const location = useLocation();

    const clientId = GoogleAuthService.getClientId();

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
        <GoogleOAuthProvider clientId={clientId}>
            <ScreenContainer>
                <div className="auth-layout__background">
                    <div className="auth-layout__background-gradient"></div>
                </div>
                
                <Outlet />
            </ScreenContainer>
        </GoogleOAuthProvider>
    );
};

export default AuthLayout;
import React, { createContext, useContext, useEffect, useState } from "react";

import { UserInfo } from "../interfaces";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../interceptors/AxiosClient";
import { useToast } from "./ToastContext";
import { AuthProviderLoader } from "../components/auth";

interface AuthContextState {
    inAuthProcess: boolean;
    sessionToken: string;
    userInfo: UserInfo;
    isAuthenticated: Boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextState | null>(null);


export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    const {
        showMessage,
    } = useToast();

    const authService = new AuthService();

    const navigate = useNavigate();

    const [ inAuthProcess, setInAuthProcess ] = useState<boolean>(true);
    const [ sessionToken, setSessionToken ] = useState<string | null>(authService.getLocalSessionToken());
    const [ userInfo, setUserInfo ] = useState<UserInfo | null>(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);

    const verifyIfUserIsAuthenticated = async () => {

        if (!sessionToken) return navigate('/');

        try {
            const result = await AxiosClient.get('/verify-session', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionToken}`
                }
            });

            setUserInfo(result.data.data);
            setIsAuthenticated(true);

            showMessage({severity: 'info', detail: `Bienvenido, ${result.data.data.name}`})
        } catch (error) {
            setIsAuthenticated(false);
            authService.removeLocalSessionToken();
            setSessionToken(null);
            setUserInfo(null);
        } finally {
            setInAuthProcess(false);
        }
    }

    const logout = async () => {
        setIsAuthenticated(false);
        authService.removeLocalSessionToken();
        setIsAuthenticated(false);
        setSessionToken(null);
        setUserInfo(null);

        navigate('/');

        showMessage({severity: 'warn', detail: 'Sesión Cerrada.'});
    }

    useEffect(() => {
        verifyIfUserIsAuthenticated();
    }, []);

    const state: AuthContextState = {
        inAuthProcess,
        sessionToken: sessionToken!,
        userInfo: userInfo!,
        isAuthenticated,
        logout,
    }

    return (
        <AuthContext.Provider value={state}>
            {
                inAuthProcess ? <AuthProviderLoader />

                : children
            }
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextState => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used with AuthProvider.');

    return context;
}
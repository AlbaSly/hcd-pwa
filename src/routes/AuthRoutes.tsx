import {Navigate, RouteObject} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.tsx";

import { LoginScreen, PasswordRecoveryScreen, SignUpScreen} from "../screens/auth";

export const AuthRoutes: RouteObject = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        /**
         * AUTH PAGES
         */
        {
            path: '',
            element: <Navigate to={'login'}/>
        },
        {
            index: true,
            path: 'login',
            element: <LoginScreen />
        },
        {
            path: 'signup',
            element: <SignUpScreen />
        },
        {
            path: 'password-recovery',
            element: <PasswordRecoveryScreen />
        },
    ]
}
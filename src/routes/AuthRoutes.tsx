import {Navigate, RouteObject} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.tsx";
import {AuthTestPage} from "../pages/auth";

export const AuthRoutes: RouteObject = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        /**
         * AUTH PAGES
         */
        {
            path: '',
            element: <Navigate to={'test'} />
        },
        {
            index: true,
            path: 'test',
            element: <AuthTestPage />
        },
    ]
}
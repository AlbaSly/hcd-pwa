import {Navigate, RouteObject} from "react-router-dom";

import AppLayout from "../layouts/AppLayout.tsx";
import { AppTestScreen } from "../screens/app";

export const AppRoutes: RouteObject = {
    path: '/app',
    element: <AppLayout />,
    children: [
        /**
         * APP PAGES
         */
        {
            path: '',
            element: <Navigate to={'test'} />
        },
        {
            index: true,
            path: 'test',
            element: <AppTestScreen />
        }
    ]
}
import { RouteObject} from "react-router-dom";

import AppLayout from "../layouts/AppLayout.tsx";
import { AppTestScreen, HomeScreen } from "../screens/app";


/**
 * Rutas del módulo App
 */
export const AppRoutes: RouteObject = {
    path: '/app',
    element: <AppLayout />,
    children: [
        /**
         * APP PAGES
         */
        {
            path: '',
            element: <HomeScreen />
        },
        {
            path: 'test',
            element: <AppTestScreen />
        }
    ]
}
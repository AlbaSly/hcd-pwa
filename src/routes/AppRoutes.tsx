import { RouteObject} from "react-router-dom";

import AppLayout from "../layouts/AppLayout.tsx";
import { CategoriesScreen, HomeScreen, MyProfileScreen, StatsScreen, TransactionsScreen } from "../screens/app";


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
            path: 'transactions',
            element: <TransactionsScreen />
        },
        {
            path: 'stats',
            element: <StatsScreen />
        },
        {
            path: 'categories',
            element: <CategoriesScreen />
        },
        {
            path: 'me',
            element: <MyProfileScreen />
        }
    ]
}
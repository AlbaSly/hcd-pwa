import { RouteObject} from "react-router-dom";

import AppLayout from "../layouts/AppLayout.tsx";
import { AppTestScreen, CategoriesScreen, HomeScreen, MyProfileScreen, StatsScreen, TransactionsScreen } from "../screens/app";

/**SOLO DEV */
import AppAlexTestScreen from "../screens/app/AppAlexTestScreen.tsx";
import AppCarlosTestScreen from "../screens/app/AppCarlosTestScreen.tsx";


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
        },
        {
            path: 'test',
            element: <AppTestScreen />
        },
        {
            path: 'test/alex',
            element: <AppAlexTestScreen />
        },
        {
            path: 'test/carlos',
            element: <AppCarlosTestScreen />
        }
    ]
}
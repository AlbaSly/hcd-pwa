import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";

import {AuthRoutes} from "./AuthRoutes.tsx";
import {AppRoutes} from "./AppRoutes.tsx";

import { IndexScreen, ErrorScreen } from "../screens";
import { ToastProvider } from "../context/ToastContext.tsx";
import { AuthProvider } from "../context/AuthContext.tsx";


/**
 * Router para gestionar diferentes rutas separadas
 * @returns JSX.Element
 */
const CoreRouter = () => {
    const routes: RouteObject = {
        path: '/',
        children: [
            {
                index: true,
                path: '',
                element: <IndexScreen />
            },
            AuthRoutes,
            AppRoutes,
        ],
        errorElement: <ErrorScreen />
    }

    const router = createBrowserRouter([routes]);

    return (
        <ToastProvider>
            <RouterProvider router={router} />
        </ToastProvider>
    );
}


export default CoreRouter;
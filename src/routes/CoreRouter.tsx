import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";

import {AuthRoutes} from "./AuthRoutes.tsx";
import {AppRoutes} from "./AppRoutes.tsx";

import { IndexScreen, ErrorScreen } from "../screens";


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
        <RouterProvider router={router} />
    );
}


export default CoreRouter;
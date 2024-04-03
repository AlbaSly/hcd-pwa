import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";

import {AuthRoutes} from "./AuthRoutes.tsx";
import {AppRoutes} from "./AppRoutes.tsx";

import { IndexPage, NotFoundPage } from "../pages";

const CoreRouter = () => {
    const routes: RouteObject = {
        path: '/',
        children: [
            {
                index: true,
                path: '',
                element: <IndexPage />
            },
            AuthRoutes,
            AppRoutes,
        ],
        errorElement: <NotFoundPage />
    }

    const router = createBrowserRouter([routes]);

    return (
        <RouterProvider router={router} />
    );
}


export default CoreRouter;
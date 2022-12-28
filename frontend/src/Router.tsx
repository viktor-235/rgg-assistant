import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import GameWheelPage from "./pages/GameWheelPage";
import MainPage from "./pages/MainPage";
import ModificatorWheelPage from "./pages/ModificatorWheelPage";

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { element: <Navigate to="/main" />, index: true },
                { path: 'main', element: <MainPage /> },
                { path: 'modWheel', element: <ModificatorWheelPage /> },
                { path: 'gameWheel', element: <GameWheelPage /> }
            ],
        },
        // {
        //     element: <SimpleLayout />,
        //     children: [
        //         { element: <Navigate to="/dashboard/app" />, index: true },
        //         { path: '404', element: <Page404 /> },
        //         { path: '*', element: <Navigate to="/404" /> },
        //     ],
        // },
        // {
        //     path: '*',
        //     element: <Navigate to="/404" replace />,
        // },
    ]);

    return routes;
}

import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import GameCollectionPage from './pages/GameCollectionPage';
import GameWheelPage from "./pages/GameWheelPage";
import MainPage from "./pages/MainPage";
import ModifierCollectionPage from './pages/ModifierCollectionPage';
import ModifierWheelPage from "./pages/ModifierWheelPage";
import GamePage from './pages/GamePage';

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { element: <Navigate to="/main" />, index: true },
                { path: 'main', element: <MainPage /> },
                { path: 'modWheel', element: <ModifierWheelPage /> },
                { path: 'gameWheel', element: <GameWheelPage /> },
                { path: 'modifierCollection', element: <ModifierCollectionPage /> },
                { path: 'gameCollection', element: <GameCollectionPage /> },
                { path: 'games', element: <GamePage /> }
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

import React, {
    lazy,
    Suspense,
    Fragment
} from 'react';
import {
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import LoadingScreen from './components/LoadingScreen';

const routesConfig = [
    {
        exact: true,
        path: '/',
        component: () => <Redirect to="/home" />
    },
    {
        path: '/home',
        layout: HomeLayout,
        routes: [
            {
                exact: true,
                path: '/home',
                component: lazy(() => import('./views/HomeView'))
            }
        ]
    },
];

const renderRoutes = (routes) => (routes ? (
    <Suspense fallback={<LoadingScreen />}>
        <Switch>
            {routes.map((route, i) => {
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Layout>
                                {route.routes
                                    ? renderRoutes(route.routes)
                                    : <Component {...props} />}
                            </Layout>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
) : null);

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;

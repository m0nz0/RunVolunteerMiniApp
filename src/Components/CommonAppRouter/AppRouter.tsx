import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoute, appRoutes } from "@/routes";

const renderRoutes = (routes: AppRoute[]): React.ReactNode =>
    routes.map(({ path, element: Element, extraProps, children }) => (
        <Route
            key={path}
            path={path}
            element={<Element {...extraProps} />}
        >
            {children && renderRoutes(children)}
        </Route>
    ));

export const AppRouter: React.FC = () => {
    return <Routes>{renderRoutes(appRoutes)}</Routes>;
};

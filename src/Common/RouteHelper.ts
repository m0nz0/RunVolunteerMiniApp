import {AppRoute, appRoutes, RouteCode} from "../routes";

export class RouteHelper {
    static getRoute(code: RouteCode): AppRoute {
        const route = appRoutes.find(r => r.routeCode === code);
        if (!route) {
            throw new Error(`Route with id ${code} not found`);
        }
        return route;
    }

    static getPath(code: RouteCode): string {
        return this.getRoute(code).path;
    }

    static getLabel(code: RouteCode): string {
        return this.getRoute(code).label;
    }
}

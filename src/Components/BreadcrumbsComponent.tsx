import {Link, matchPath, useLocation} from "react-router-dom";
import {Breadcrumb} from "react-bootstrap";
import {appRoutes} from "../routes";

export const BreadcrumbsComponent: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    let crumbs: { to: string; label: string }[] = [];

    pathnames.forEach((_, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const route = appRoutes.find((r) => matchPath(r.path, to));

        if (route) {
            // достаём параметры (например :id)
            const match = matchPath({path: route.path, end: true}, to);
            const params = match?.params || {};

            const label =
                typeof route.label === "function" ? route.label(params as Record<string, string>) : route.label;

            crumbs.push({to, label});
        }
    });

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>
                Главная
            </Breadcrumb.Item>
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return isLast ? (
                    <Breadcrumb.Item active key={crumb.to}>
                        {crumb.label}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item
                        linkAs={Link}
                        linkProps={{to: crumb.to}}
                        key={crumb.to}
                    >
                        {crumb.label}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

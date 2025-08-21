import {Link, useLocation} from "react-router-dom";
import {Breadcrumb} from "react-bootstrap";

export const BreadcrumbsComponent: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/test"}}>Home</Breadcrumb.Item>
            {pathnames.map((value, index) => {
                const to = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Breadcrumb.Item active key={to}>{value}</Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item linkAs={Link} linkProps={{to}} key={to}>
                        {value}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

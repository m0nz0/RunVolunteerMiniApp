import React from "react";
import { Link, LinkProps } from "react-router-dom";

// универсальный адаптер для react-bootstrap компонентов
const LinkAdapter = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link ref={ref} {...props} />
));

LinkAdapter.displayName = "LinkAdapter";

export default LinkAdapter;

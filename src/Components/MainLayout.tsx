import React from "react";
import {Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {MenuComponent} from "./Menu/MenuComponent";
import {LocationListComponent} from "./LocationList/LocationListComponent";
import {AboutComponent} from "./About/AboutComponent";
import {Breadcrumbs} from "./BreadcrumbsComponent";
import MyEntriesComponent from "./MyEntries/MyEntriesComponent";
import ExistingEntriesComponent from "./ExistingEntries/ExistingEntriesComponent";
import NewEntryComponent from "./NewEntry/NewEntryComponent";

interface Props {
    tgUser: any
}

export const MainLayout: React.FC<Props> = (props) => {
    return (
        <Container>
            <Breadcrumbs/>
            <Routes>
                <Route path="/test" element={<MenuComponent tgUser={props.tgUser}/>}/>
                <Route path="/test/new-entry" element={<NewEntryComponent/>}/>
                <Route path="/test/my-entries" element={<MyEntriesComponent/>}/>
                <Route path="/test/existing-entries" element={<ExistingEntriesComponent/>}/>
                <Route path="/test/about" element={<AboutComponent/>}/>
                <Route path="/test/locations" element={<LocationListComponent/>}/>
            </Routes>
        </Container>
    );
};

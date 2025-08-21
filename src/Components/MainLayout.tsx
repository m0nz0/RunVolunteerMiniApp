import React from "react";
import {Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {MenuComponent} from "./Menu/MenuComponent";
import {LocationListComponent} from "./LocationList/LocationListComponent";
import {AboutComponent} from "./About/AboutComponent";
import {BreadcrumbsComponent} from "./BreadcrumbsComponent";
import MyEntriesComponent from "./MyEntries/MyEntriesComponent";
import ExistingEntriesComponent from "./ExistingEntries/ExistingEntriesComponent";
import NewEntryComponent from "./NewEntry/NewEntryComponent";

interface Props {
    tgUser: any
}

export const MainLayout: React.FC = () => {
    return (
        <Container>
            <BreadcrumbsComponent/>
            <Routes>
                <Route path="/test" element={<MenuComponent/>}/>
                <Route path="/new-entry" element={<NewEntryComponent/>}/>
                <Route path="/my-entries" element={<MyEntriesComponent/>}/>
                <Route path="/existing-entries" element={<ExistingEntriesComponent/>}/>
                <Route path="/about" element={<AboutComponent/>}/>
                <Route path="/locations" element={<LocationListComponent/>}/>
            </Routes>
        </Container>
    );
};

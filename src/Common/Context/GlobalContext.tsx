import React, {createContext, useContext, useEffect, useState} from "react";
import {GlobalLocationDictItem} from "../../types";
import LocationService from "../../Services/LocationService";

interface GlobalContextType {
    locationDict: Record<number, GlobalLocationDictItem>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [locationDict, setLocationDict] = useState<Record<number, GlobalLocationDictItem>>({});

    const fetchLocations = async () => {
        const res = await LocationService.getLocations();
        setLocationDict(Object.fromEntries(res.map(x => [x.verstId, {verstId: x.verstId, name: x.name}])));
    };

    useEffect(() => {
        fetchLocations();
        const interval = setInterval(fetchLocations, 60 * 60 * 1000); // раз в час
        return () => clearInterval(interval);
    }, []);

    return (
        <GlobalContext.Provider value={{locationDict}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const ctx = useContext(GlobalContext);
    if (!ctx) throw new Error("useGlobalContext must be used within GlobalProvider");
    return ctx;
};

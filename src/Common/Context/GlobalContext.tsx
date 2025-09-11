import React, {createContext, useContext, useEffect, useState} from "react";
import {Position, VerstLocation} from "../../types";
import VerstService from "../../Services/VerstService";
import PositionService from "../../Services/PositionService";
import {toast} from "react-toastify";

interface GlobalContextType {
    locationDict: Record<number, VerstLocation>;
    positionDict: Record<number, Position>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [locationDict, setLocationDict] = useState<Record<number, VerstLocation>>({});
    const [positionDict, setPositionDict] = useState<Record<number, Position>>({});

    const fetchLocations = async () => {
        await VerstService.getLocations()
            .then(value =>
                setLocationDict(Object.fromEntries((value?.result?.data ?? []).map((x: VerstLocation) => [x.id, x])))
            ).catch(reason => {
                console.error(reason)
                toast.error("Ошибка получения списка локаций 5 вёрст")
            });
    };

    const fetchPositions = async () => {
        await PositionService.getAllPositions()
            .then(value =>
                setPositionDict(Object.fromEntries((value ?? []).map((x: Position) => [x.id, x])))
            ).catch(reason => {
                console.error(reason)
                toast.error("Ошибка получения списка позиций 5 вёрст")
            });
    };

    useEffect(() => {
        fetchLocations();
        fetchPositions();
        const interval = setInterval(fetchLocations, 60 * 60 * 1000); // раз в час
        return () => clearInterval(interval);
    }, []);

    return (
        <GlobalContext.Provider value={{locationDict, positionDict}}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const ctx = useContext(GlobalContext);
    if (!ctx) throw new Error("useGlobalContext must be used within GlobalProvider");
    return ctx;
};

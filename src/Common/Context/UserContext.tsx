// UserContext.tsx
import React, {createContext, useContext, useEffect, useState} from "react";
import {UserLocationDictItem} from "../../types";

interface UserContextType {
    userLocationDict: UserLocationDictItem[];
    refreshUserLocations: () => Promise<void>;
    updateUserLocations: (locations: UserLocationDictItem[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [userLocationDict, setUserLocationDict] = useState<UserLocationDictItem[]>([]);

    // загрузка данных с бэка
    const fetchUserLocations = async () => {
        const res = await fetch("/api/user-locations"); // бэкенд отдаёт данные текущего пользователя
        const data: UserLocationDictItem[] = await res.json();
        setUserLocationDict(data);
    };

    // начальная загрузка
    useEffect(() => {
        fetchUserLocations();
    }, []);

    // метод для ручного обновления из бэка
    const refreshUserLocations = async () => {
        await fetchUserLocations();
    };

    // метод для обновления вручную (например, после формы или фильтра)
    const updateUserLocations = (locations: UserLocationDictItem[]) => {
        setUserLocationDict(locations);
    };

    return (
        <UserContext.Provider value={{userLocationDict, refreshUserLocations, updateUserLocations}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within UserProvider");
    return ctx;
};

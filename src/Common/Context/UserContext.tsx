// UserContext.tsx
import React, {createContext, useContext, useState} from "react";
import {CalendarInfo, Position, UserLocationDictItem} from "../../types";

interface UserContextType {
    userLocationDict: Record<number, UserLocationDictItem>;
    userDatesDict: Record<number, CalendarInfo>;
    userPositionDict: Record<number, Position>;
    // refreshUserLocations: () => Promise<void>;
    updateUserLocations: (locations: UserLocationDictItem[]) => void;
    updateUserDates: (dates: CalendarInfo[]) => void;
    updateUserPositions: (positions: Position[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [userLocationDict, setUserLocationDict] = useState<Record<number, UserLocationDictItem>>({});
    const [userDatesDict, setUserDatesDict] = useState<Record<number, CalendarInfo>>({});
    const [userPositionDict, setUserPosition] = useState<Record<number, Position>>({});

    // загрузка данных с бэка
    // const fetchUserLocations = async () => {
    //     const res = await fetch("/api/user-locations"); // бэкенд отдаёт данные текущего пользователя
    //     const data: UserLocationDictItem[] = await res.json();
    //     setUserLocationDict(data);
    // };

    // начальная загрузка
    // useEffect(() => {
    //     fetchUserLocations();
    // }, []);

    // метод для ручного обновления из бэка
    // const refreshUserLocations = async () => {
    //     await fetchUserLocations();
    // };

    // метод для обновления вручную (например, после формы или фильтра)
    const updateUserLocations = (data: UserLocationDictItem[]) => {
        setUserLocationDict(Object.fromEntries(data.map(x => [x.verstId, x])));
    };
    const updateUserDates = (data: CalendarInfo[]) => {
        setUserDatesDict(Object.fromEntries(data.map(x => [x.id, x])));
    };
    const updateUserPositions = (data: Position[]) => {
        setUserPosition(Object.fromEntries(data.map(x => [x.id, x])));
    };

    return (
        <UserContext.Provider value={{
            userLocationDict,
            userDatesDict,
            userPositionDict,
            updateUserLocations,
            updateUserDates,
            updateUserPositions
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within UserProvider");
    return ctx;
};

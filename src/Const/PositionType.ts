import {IconProp} from "@fortawesome/fontawesome-svg-core";

export enum PositionType {
    Main = 1,
    Additional = 2,
    Rare
}

export const PositionTypeParams: { [key in PositionType]: { name: string, icon: IconProp | null } } = {
    [PositionType.Main]: {name: "Обязательные", icon: null},
    [PositionType.Additional]: {name: "Дополнительные", icon: null},
    [PositionType.Rare]: {name: "Редкие", icon: null},
}

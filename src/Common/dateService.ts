import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export const dateService = {
    // Преобразовать ISO строку в dayjs объект в локальном времени
    toLocalDate: (iso: string) => dayjs(iso),

    // Формат: "23.08.2025"
    formatDMY: (iso: string) => dayjs(iso).format("DD.MM.YYYY"),

    // Формат: "23 августа 2025"
    formatDayMonthNameYear: (iso: string) => dayjs(iso).format("D MMMM YYYY"),
};

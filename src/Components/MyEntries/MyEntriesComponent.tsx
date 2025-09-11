import React, {FC, useEffect, useState} from "react";
import TeamService from "../../Services/TeamService";
import {EntryComponent} from "./EntryComponent";
import {Spinner} from "react-bootstrap";
import {AppButtons} from "@/Const/AppButtons";
import {toast} from "react-toastify";
import {Team} from "@/types";

export const MyEntriesComponent: FC = () => {
    const [data, setData] = useState<Team[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                let data = await TeamService.getMySchedules()
                setData(data)

            } catch (err) {
                if (isMounted) {
                    console.error(err)
                    toast.error("Ошибка получения моих записей")
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="p-3 text-center">
                <Spinner animation="border" role="status"/>
                <p className="mt-2">Загрузка...</p>
            </div>
        );
    }

    return data.length > 0 ?
        <p className={"text-center"}>
            <h5>Это список ваших предстоящих волонётрств</h5>
            <div className={"d-grid gap-2"}>
                {data.map(x => <EntryComponent key={x.id} team={x}/>)}
            </div>
        </p> :
        <p className={"text-center"}>
            <h5>У вас нет предстоящих записей</h5>
            {AppButtons.NewEntry()}
        </p>

}

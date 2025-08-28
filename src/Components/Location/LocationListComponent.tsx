import {FC, useEffect, useState} from "react";
import {Form, FormCheck, Spinner} from "react-bootstrap";
import LocationService from "../../Services/LocationService";
import {LocationFlag} from "../../Const/LocationFlag";
import {LocationFlagComponent} from "./LocationFlagComponent";
import {FlagChecker, TgUser, UserLocationDictItem} from "../../types";
import {LocationViewType} from "../../Const/LocationViewType";
import {LocationMiniCardComponent} from "./LocationMiniCardComponent";

interface Props {
    defaultSwitchedFilters: LocationFlag[]
    hiddenFilters: LocationFlag[],
    locationViewType: LocationViewType,
}

export const LocationListComponent: FC<Props> = (props) => {

    const [locations, setLocations] = useState<UserLocationDictItem[]>([]);
    const [user, setUser] = useState<TgUser>()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [checkedItems, setCheckedItems] = useState<FlagChecker[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await LocationService.getLocations(props.locationViewType);
                // updateUserLocations(data);

                let sorted = data.locations
                    .sort((a, b) => {
                            let af = a.locationFlags.map(f => LocationFlag[f as keyof typeof LocationFlag]);
                            let bf = b.locationFlags.map(f => LocationFlag[f as keyof typeof LocationFlag]);

                            let home = (af.some(f => f === LocationFlag.Home) ? 0 : 1) -
                                (bf.some(f => f === LocationFlag.Home) ? 0 : 1);
                            if (home !== 0) {
                                return home;
                            }
                            let favor = (af.some(f => f === LocationFlag.Favorite) ? 0 : 1) -
                                (bf.some(f => f === LocationFlag.Favorite) ? 0 : 1);
                            if (favor !== 0) {
                                return favor;
                            }

                            let direct = (af.some(f => f === LocationFlag.Directed) ? 0 : 1) -
                                (bf.some(f => f === LocationFlag.Directed) ? 0 : 1)

                            if (direct !== 0) {
                                return direct;
                            }
                            return a.name.localeCompare(b.name);
                        }
                    );

                setLocations(props.locationViewType === LocationViewType.ForSchedule ?
                    sorted.filter(value => value.botActive) :
                    sorted)
                setUser(data.user)

                let flags = [...new Set(data.locations.map(x => x.locationFlags).flat())]
                    .map(x => LocationFlag[x as keyof typeof LocationFlag])
                    .filter(value => !props.hiddenFilters.some(hf => hf === value));
                setCheckedItems(flags.map(x => {
                    return {id: x, flag: props.defaultSwitchedFilters.some(f => f === x)}
                }))
            } catch (err) {
                if (isMounted) setError((err as Error).message);
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

    const filteredLocations = () => {
        if (checkedItems.every(x => !x.flag)) {
            return locations;
        }

        let checked = checkedItems.filter(x => x.flag).map(x => x.id)
        return locations
            .filter(x => {
                let flags = x.locationFlags.map(f => LocationFlag[f as keyof typeof LocationFlag]);
                return checked.every(t => flags.includes(t))
            });
    }

    const handleCheckboxChange = (itemId: LocationFlag) => {
        setCheckedItems(prevItems =>
            prevItems.map(x => {
                return {id: x.id, flag: itemId === x.id ? !x.flag : x.flag}
            })
        );
    };


    return <div>
        <Form>
            {
                checkedItems.map(x => {
                    return <FormCheck type={"switch"}
                                      id={x.id.toString()}
                                      key={x.id}
                                      disabled={props.hiddenFilters.some(f => f === x.id)}
                                      checked={x.flag}
                                      label={<LocationFlagComponent flag={x.id} withText={true}/>}
                                      onChange={() => handleCheckboxChange(x.id)}>
                    </FormCheck>
                })
            }
        </Form>
        <div className={"d-grid gap-2"}>
            {filteredLocations().map((loc) => {
                return <div key={loc.verstId}>
                    <LocationMiniCardComponent location={loc}
                                               locationViewType={props.locationViewType}
                                               user={user}/>
                </div>
            })
            }
        </div>
    </div>
}

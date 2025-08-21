import {FC, useEffect, useState} from "react";
import {FullRequest} from "../../Model/FullRequest";
import {Accordion, Form, FormCheck, Spinner} from "react-bootstrap";
import LocationService, {LocationInfo} from "../../Services/LocationService";
import {LocationInfoComponent} from "../LocationInfo/LocationInfoComponent";
import {LocationFlag, LocationFlagIcon} from "../../Const/LocationFlag";
import {LocationFlagComponent} from "../LocationFlag/LocationFlagComponent";

interface Props {
    request: FullRequest;
    onBack: () => void;
}

interface FlagChecker {
    id: LocationFlag,
    flag: boolean
}

const defaultSwitchedFilters = [LocationFlag.Favorite, LocationFlag.IsBotActive];

export const LocationListComponent: FC = () => {

    const [locations, setLocations] = useState<LocationInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [checkedItems, setCheckedItems] = useState<FlagChecker[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await LocationService.getLocations();
                setLocations(data
                    .sort((a, b) => {
                            let af = a.locationFlags.map(f => LocationFlag[f as keyof typeof LocationFlag]);
                            let bf = b.locationFlags.map(f => LocationFlag[f as keyof typeof LocationFlag]);

                            let home = (af.some(f => f === LocationFlag.Home) ? 0 : 1) -
                                (bf.some(f => f === LocationFlag.Home) ? 0 : 1);
                            if (home != 0) {
                                return home;
                            }
                            let favor = (af.some(f => f === LocationFlag.Favorite) ? 0 : 1) -
                                (bf.some(f => f === LocationFlag.Favorite) ? 0 : 1);
                            if (favor != 0) {
                                return favor;
                            }

                            let direct = (af.some(f => f === LocationFlag.Directed) ? 0 : 1) -
                                (bf.some(f => f === LocationFlag.Directed) ? 0 : 1)

                            if (direct != 0) {
                                return direct;
                            }
                            return a.name.localeCompare(b.name);
                        }
                    )
                )

                let flags = [...new Set(data.map(x => x.locationFlags).flat())].map(x => LocationFlag[x as keyof typeof LocationFlag]);
                setCheckedItems(flags.map(x => {
                    return {id: x, flag: defaultSwitchedFilters.some(f => f === x)}
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
                return checked.every(x => flags.includes(x))
            });
    }

    const handleCheckboxChange = (itemId: number) => {
        setCheckedItems(prevItems =>
            prevItems.map(x => {
                return {id: x.id, flag: itemId == x.id ? !x.flag : x.flag}
            })
        );
    };

    return <div>
        <h2 className="text-center">Это список всех локаций. Воспользуйтесь фильтрами и поиском, чтобы найти нужную</h2>
        <div>
            <Form>
                {
                    checkedItems.map(x => {
                        let ico = LocationFlagIcon[x.id as keyof typeof LocationFlagIcon]
                        return <FormCheck type={"switch"}
                                          id={x.id.toString()}
                                          key={x.id}
                                          checked={x.flag}
                                          label={<LocationFlagComponent flag={x.id} withText={true}/>}
                                          onChange={() => handleCheckboxChange(x.id)}>
                        </FormCheck>
                            ;
                    })
                }
            </Form>
        </div>
        <Accordion>
            {filteredLocations().map((loc) => (
                <Accordion.Item eventKey={String(loc.verstId)} key={loc.verstId}>
                    <Accordion.Header>
                        <div>
                            <span dangerouslySetInnerHTML={{__html: loc.href}}></span>
                            <span>
                                {
                                    loc.locationFlags.map(x => {
                                        let flag = LocationFlag[x as keyof typeof LocationFlag];
                                        return <LocationFlagComponent key={loc.verstId + "-" + x} flag={flag}
                                                                      withText={false}/>;
                                    })}
                            </span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <LocationInfoComponent location={loc}/>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    </div>
}

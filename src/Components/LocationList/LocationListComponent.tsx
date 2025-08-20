import {FC, useEffect, useState} from "react";
import {FullRequest} from "../../Model/FullRequest";
import {Accordion, Form, FormCheck, Spinner} from "react-bootstrap";
import LocationService, {LocationInfo} from "../../Services/LocationService";
import {LocationInfoComponent} from "../Location/LocationInfoComponent";
import {LocationFlag, LocationFlagIcon, LocationFlagName} from "../../Const/LocationFlag";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface Props {
    request: FullRequest;
    onBack: () => void;
}

interface FlagChecker {
    id: number,
    flag: boolean
}

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
                setLocations(data);
                let flags = [...new Set(data.map(x => x.locationFlags).flat())].map(x => LocationFlag[x as keyof typeof LocationFlag]);
                setCheckedItems(flags.map(x => {
                    return {id: x, flag: false}
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
        if (checkedItems.every(x => x.flag == false)) {
            return locations;
        }

        let checked = checkedItems.filter(x => x.flag).map(x => x.id);
        let filtered = locations
            .filter(x => {
                let flags = x.locationFlags.map(f => LocationFlag[f as keyof typeof LocationFlag]);
                console.log(flags)
                return flags.some(x => checked.includes(x))
            });
        return filtered;
    }

    const handleCheckboxChange = (itemId: number) => {
        setCheckedItems(prevItems =>
            prevItems.map(x => {
                return {id: x.id, flag: itemId == x.id ? !x.flag : x.flag}
            })
        );
    };

    return <div>
        <h2 className="text-center">Это список всех локаций. Воспользуйтесь фильтрами и поском, чтобы найти нужную</h2>
        <div>
            <Form>
                {
                    checkedItems.map(x => {
                        let ico = LocationFlagIcon[x.id as keyof typeof LocationFlagIcon]
                        console.log("ico", ico)
                        return <FormCheck type={"switch"}
                                          id={x.id.toString()}
                                          key={x.id}
                                          label={
                                              <span>
                                                  <FontAwesomeIcon
                                                      icon={LocationFlagIcon[x.id as keyof typeof LocationFlagIcon]}/> <span> {LocationFlagName[x.id as keyof typeof LocationFlagName]} </span>
                                              </span>}
                                          onChange={() => handleCheckboxChange(x.id)}>
                        </FormCheck>
                            ;
                    })
                }
            </Form>
        </div>
        <Accordion>
            {filteredLocations().sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0).map((loc) => (
                <Accordion.Item eventKey={String(loc.verstId)} key={loc.verstId}>
                    <Accordion.Header>
                        <div>
                            <span dangerouslySetInnerHTML={{__html: loc.href}}></span>
                            <span>
                                {
                                    loc.locationFlags.map(x => {
                                        let flag = LocationFlag[x as keyof typeof LocationFlag]
                                        return <FontAwesomeIcon
                                            icon={LocationFlagIcon[flag]}/>
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

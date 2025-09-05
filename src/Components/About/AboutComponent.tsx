import {FC} from "react";
import {Link} from "react-router-dom";
import {RouteHelper} from "../../Common/RouteHelper";
import {RouteCode} from "../../routes";

interface Props {
    onBack: () => void;
}

export const AboutComponent: FC = () => {
    return (
        <div>
            <p className={"text-center"}>
                <h5>С помощью меня можно:</h5>
            </p>
            <ol>
                <li>
                    <Link to={RouteHelper.getPath(RouteCode.NewEntrySelectLocation)}>Записаться</Link> в волонтёры в
                    интересующий парк на нужную дату и нужную позицию. Или записать в волонтёры
                    другого человека (например, ребёнка).
                </li>
                <li>
                    Просмотреть <Link to={RouteHelper.getPath(RouteCode.MyEntries)}>свои записи</Link>.
                </li>
                <li>
                    Отменить свою запись.
                </li>
                <li>
                    Посмотреть список тех, кто <Link to={RouteHelper.getPath(RouteCode.ExistingEntries)}>уже
                    записался</Link>.
                </li>
                <li>
                    Можно привязать свой аккаунт 5 вёрст в разделе <Link
                    to={RouteHelper.getPath(RouteCode.Profile)}>Профиль</Link>. Это облегчит вам запись в волонтёры,
                    т.к. не надо будет постоянно представляться. И специально для инициативных родителей есть
                    возможность привязать дополнительный аккаунт ребёнка, чтобы ему тикали волонтёрства
                </li>
                <li>
                    В разделе <Link to={RouteHelper.getPath(RouteCode.Locations)}>Локации</Link> можно посмотреть
                    информацию о локациях (директоров, статус, возможность записи через бота, настроить отображение
                    позиций для записи...)
                </li>
                <li>
                    Подать заявку на роль ран-директора.<br/>
                    Такая заявка прилетает другим имеющимся ран-директорам. Одобрить или отклонить может любой
                    ран-директор.<br/>Если пользователя уже одобрили на роль директора, то у него появляются
                    дополнительные опции:
                    <ol>
                        <li>
                            В списке волонтёрских ролей внутри кнопки <Link
                            to={RouteHelper.getPath(RouteCode.NewEntrySelectLocation)}>Записаться</Link> появляется
                            "Руководитель". Можно туда записаться.
                        </li>
                        <li>
                            Когда записался руководителем на определённую дату, то начнёшь получать уведомления вида
                            "На ваш забег записался волонтёр Вася на позицию секундомер" / "Волонтёр Вася отменил свою
                            запись на волонтёрство".
                        </li>
                        <li>
                            Можешь одобрять/отклонять других новеньких ран-директоров.
                        </li>
                    </ol>
                </li>
            </ol>
            <br/>
            <strong>Полезные ссылки:</strong>
            <ul>
                <li><a href={"https://5verst.ru/"}>Главная 5 вёрст</a></li>
                <li><a href={"https://nrms.5verst.ru/"}>NRMS</a></li>
                <li><a href={"https://my.5verst.ru/"}>Ваш личный кабинет</a></li>
                {/*<li><a href={"https://5krun.info/dashboards/f/AMNIEuhVk/"}>Интересная статистика</a></li>*/}
            </ul>
        </div>
    )
}

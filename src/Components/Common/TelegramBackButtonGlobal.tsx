import {FC, useEffect, useRef} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

/**
 * TelegramBackButtonGlobal
 * - помечает начальную запись истории флагом { tgRoot: true }
 * - обрабатывает нажатие внутренней кнопки Telegram и системную popstate
 * - если текущая запись помечена как tgRoot => закрываем WebApp (tg.close),
 *   иначе => navigate(-1)
 */
export const TelegramBackButtonGlobal: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const mountedRef = useRef(false)

    useEffect(() => {
        const tg = (window as any)?.Telegram?.WebApp
        if (!tg?.BackButton) return

        // Пометка начальной/корневой записи истории — делаем один раз при первой загрузке
        if (!mountedRef.current) {
            try {
                const currentState = window.history.state ?? {}
                // сохраняем флаги, не перезаписывая остальное
                window.history.replaceState({...currentState, tgRoot: true}, '', window.location.href)
            } catch {
                // ignore (браузер может кидать в некоторых окружениях)
            }
            mountedRef.current = true
        }

        const backButton = tg.BackButton
        backButton.show() // показываем кнопку

        const handleBackClick = () => {
            // если текущая запись помечена tgRoot => закрыть, иначе идти назад
            const state = window.history.state as {tgRoot?: boolean} | null
            if (state?.tgRoot) {
                tg?.close?.()
            } else {
                navigate(-1)
            }
        }

        // аппаратная кнопка: popstate срабатывает при смене истории (back/forward).
        // Тут мы смотрим текущую запись: если tgRoot — закрываем.
        const handlePopState = () => {
            const state = window.history.state as {tgRoot?: boolean} | null
            if (state?.tgRoot) {
                // если попали на корневой entry после pop -> закрываем
                tg?.close?.()
            }
            // иначе — ничего, React Router уже сделал навигацию
        }

        // Подписываемся
        backButton.onClick(handleBackClick)
        window.addEventListener('popstate', handlePopState)

        // Telegram niceties
        try {
            tg?.expand?.()
            tg?.disableVerticalSwipes?.()
        } catch {
            /* ignore */
        }

        // Пересчитывать label кнопки при каждом роуте полезно (опционально)
        const updateBackText = () => {
            const state = window.history.state as {tgRoot?: boolean} | null
            if (state?.tgRoot) {
                // нет родителя — можно показать "Закрыть"
                try {
                    // Telegram API: backButton.text = 'Закрыть' (работает в новых клиентах)
                    if (typeof backButton.setText === 'function') {
                        // некоторые версии имеют метод setText
                        (backButton as any).setText('Закрыть')
                    } else {
                        // попытка установить свойство text (в разных версиях API по-разному)
                        (backButton as any).text = 'Закрыть'
                    }
                } catch {
                    // ignore
                }
            } else {
                try {
                    if (typeof backButton.setText === 'function') {
                        (backButton as any).setText('Назад')
                    } else {
                        (backButton as any).text = 'Назад'
                    }
                } catch {
                    // ignore
                }
            }
        }

        // Обновим текст сразу и при каждом изменении location
        updateBackText()

        return () => {
            backButton.offClick(handleBackClick)
            window.removeEventListener('popstate', handlePopState)
        }
        // пересоздаём подписки при смене пути, чтобы updateBackText вызывался каждый раз
    }, [navigate, location])

    return null
}

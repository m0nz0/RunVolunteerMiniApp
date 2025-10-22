import {FC, useEffect, useRef} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

export const TelegramBackButtonGlobal: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const firstPathRef = useRef(location.pathname)

    useEffect(() => {
        const tg = window?.Telegram?.WebApp
        if (!tg?.BackButton) {
            return
        }

        const backButton = tg.BackButton
        backButton.show()

        const handleBack = () => {
            if (window.history.length > 1) {
                navigate(-1)
            }
            // если мы на стартовом экране — закрываем приложение
            else if (location.pathname === firstPathRef.current) {
                tg?.close?.()
            } else {
                navigate(-1)
            }
        }

        const handleHardwareBack = () => {
            if (location.pathname === firstPathRef.current) {
                tg?.close?.()
            }
        }

        backButton.onClick(handleBack)
        window.addEventListener('popstate', handleHardwareBack)

        tg?.expand?.()
        tg?.disableVerticalSwipes?.()

        return () => {
            backButton.offClick(handleBack)
            window.removeEventListener('popstate', handleHardwareBack)
        }
    }, [navigate, location])

    return null
}

import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import style from '../../styles/header.module.scss'

const Header = () => {
    const [value, setValue] = useState<string>('')
    const router = useRouter()

    const onNavigateSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (value.length > 0) {
            router.push(`/search/${value}`)
            setValue('')
        }
    }

    return (
        <header className={style.header}>
            <div className={style.header__container}>
                <div className={style.header__inner}>
                    <Link href={`/`}>
                        <a className={style.header__logo}>
                            <span className={style.fff}>Ani</span>JoJo
                        </a>
                    </Link>
                    <form className={style.header__form}>
                        <input className={style.header__input} value={value} onChange={e => setValue(e.target.value)} placeholder='Поиск аниме' />
                        <button onClick={onNavigateSearch} className={style.header__button}><img src='/loop.svg' /></button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header
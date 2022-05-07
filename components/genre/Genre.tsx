import React, { FC, useState } from 'react'
import style from '../../styles/genre.module.scss'

type GenreProps = {
    item: any
    handleGenre: (value: string) => void
}

const Genre: FC<GenreProps> = ({item, handleGenre}) => {

    const [active, setActive] = useState<boolean>(true)

    const toggleButton = (item: string) => {
        setActive(!active)
        handleGenre(item)
    }

  return (
    <div  onClick={() => toggleButton(item.value)} className={`${active === true ? style.false : style.true}`}>
        {item.value}
    </div>
  )
}

export default Genre
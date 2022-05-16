import Link from 'next/link'
import React, { FC } from 'react'
import { AnimeProps } from '../../type/type'
import style from '../../styles/list.module.scss'

type AnimeCardProps = {
    item: AnimeProps
    id: number
}

const AnimeCard:FC<AnimeCardProps> = ({item}) => {
    return (
    <Link href={{
        pathname: `/anime/${item.material_data.title_en}`,
        query: { param: `${item.id}` },
      }} >
        <a className={style.list__card}>
          <img className={style.list__card__img} src={item.material_data?.poster_url} alt='anime poster' />
          <div className={style.list__card__content}>
            <h2 className={style.list__card__title}>{item.material_data?.anime_title}</h2>
            <span>
              <span className={style.list__card__episodes}>{item.last_season === undefined ? "" : item.last_season + " сезон"}</span>
              <span className={style.list__card__episodes}>{item.material_data?.anime_kind === "movie" ? "Фильм" : item.material_data?.anime_kind === 'tv' ? 'TV сериал' : item.material_data?.anime_kind === 'ova' ? 'OVA' : 'Спешл'}</span>
            </span>
          </div>
        </a>
      </Link>
  )
}

export default React.memo(AnimeCard)
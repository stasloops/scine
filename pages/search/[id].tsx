import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import style from '../../styles/search.module.scss'
import { AnimeProps, KodikProps } from '../../type/type'

const Search = () => {
  const [newSearch, setNewSearch] = useState<AnimeProps[]>([])
  const [search, setSearch] = useState<AnimeProps[]>([])
  const { query } = useRouter()

  const fetchSearch = async () => {
    const response = await axios.get<KodikProps>(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&title=${query.id}&types=anime-serial,anime&with_material_data=true`)
    setSearch(response.data.results)
  }
  
  useEffect(() => {
    fetchSearch()
  }, [query.id])

  useEffect(() => {
    let cityMap:any = new Map();
    search.forEach((p: AnimeProps) => cityMap.set(p.worldart_link, p));
    setNewSearch([...cityMap.values()])
  }, [search])

  return (
    <Layout title={`Поиск по запросу «${query.id}»`}>
      <main className={style.search}>
        <div className={style.search__container}>
          <div className={style.search__inner}>
            <div className={style.search__search}>
              <h6 className={style.search__result_search}>{query.id?.length === 0 ? null : 'Результат поиска: ' + query.id}</h6>
              <h6 className={style.search__result}>{'Результатов: ' + newSearch?.length}</h6>
            </div>
            {
              <div className={style.search__cards}>
                {
                  search.length === 0 ?
                    <h2 className={style.fff}>Попробуйте ввести название аниме по-другому. В случае, если вам все равно не удалось найти нужное вам аниме, напишите мне.</h2>
                    :
                    newSearch?.map((item, id) => (
                      <Link key={`${item.id}-${id}`} href={{
                        pathname: `/anime/${item.material_data?.title_en}`,
                        query: { param: `${item.id}` },
                      }} >
                        <a className={style.search__card}>
                          <img className={style.search__card__img} src={item.material_data?.poster_url} alt='search poster' />
                          <div className={style.search__card__content}>
                            <h2 className={style.search__card__title}>{item.material_data?.anime_title}</h2>
                            <span>
                              <span className={style.search__card__episodes}>{item.last_season === undefined ? "" : item.last_season + " сезон"} </span>
                              <span className={style.search__card__episodes}>{item.material_data?.anime_kind === "movie" ? "Фильм" : item.material_data?.anime_kind === 'tv' ? 'TV сериал' : item.material_data?.anime_kind === 'ova' ? 'OVA' : 'Спешл'}</span>
                            </span>
                          </div>
                        </a>
                      </Link>
                    ))
                }
              </div>
            }
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Search

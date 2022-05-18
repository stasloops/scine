import style from '../styles/list.module.scss'
import React, { useEffect, useState } from "react"
import axios from "axios"
import Layout from "../layout/Layout"
import Filters from "../components/filters/Filters"
import { AnimeProps, KodikProps, ValueProps } from "../type/type"
import AnimeCard from "../components/anime-card/AnimeCard"

const App = () => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [pages, setPages] = useState<KodikProps | undefined >(undefined)
  const [anime, setAnime] = useState<AnimeProps[]>([])
  const [newAnime, setNewAnime] = useState<AnimeProps[]>([])
  const [params, setParams] = useState<ValueProps>({ valueSort: 'shikimori_rating', valueGenres: '', valueType: 'tv', valueYear: '' })
  const [opacity, setOpacity] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(100)

  useEffect(() => {
    setPages(undefined)
    setAnime([])
    setFetching(true)
    setCount(0)
  }, [params])

  useEffect(() => {
    document.addEventListener('scroll', onTopScroll)
    return function () {
      document.removeEventListener('scroll', onTopScroll)
    }
  }, [])

  const onTopScroll = (e: any) => {
    if (e.target.documentElement.scrollTop > 500) {
      setOpacity(true)
    }
    else {
      setOpacity(false)
    }
  }

  const fetchAnime = async () => {
    setLoading(true)
    const res = await axios.get<KodikProps>(pages?.next_page === undefined ? `https://kodikapi.com/list?token=30ef128890b06e03700a3628b91c87c2&with_material_data=true&translation_id=609,739,2068,557,827&limit=45&sort=${params.valueSort}&anime_genres=${params.valueGenres}&anime_kind=${params.valueType}${params.valueYear.length === 0 ? '' : '&year=' + params.valueYear}` : `${pages.next_page}&with_material_data=true&translation_id=609,739,2068,557,827&limit=45&sort=${params.valueSort}&anime_genres=${params.valueGenres}&anime_kind=${params.valueType}${params.valueYear.length === 0 ? '' : '&year=' + params.valueYear}`)
    setPages(res.data)
    setAnime([...anime, ...res.data.results])
    setFetching(false)
    setCount(count + 1)
    setLoading(false)
  }

  useEffect(() => {   
    if (fetching === true && count !== totalCount && totalCount !== 0) {
      fetchAnime()
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <= 500) {
      setFetching(true)
    }
  }

  useEffect(() => {
    let dataMap: any = new Map();
    anime.forEach((p: AnimeProps) => dataMap.set(p.worldart_link, p));
    setNewAnime([...dataMap.values()])
  }, [anime])

  useEffect(() => {
    if(pages?.total){
    setTotalCount(Math.ceil(pages.total / 45))
    }
  }, [pages?.total])

  const onScroll = () => {
    window.scrollTo(0, 0)
  }

  const fetchTrue = () => {    
    if (fetching === false) {
      setFetching(true)
    } else {
      setFetching(false)
      setTimeout(() => {
        setFetching(true)
      }, 0)
    }
  }

  return (<>
    <Layout title="Смотреть Аниме онлайн бесплатно в хорошем качестве" >
      <main className={style.list}>
        <img onClick={onScroll} style={{ display: opacity === false ? 'none' : '' }} className={style.list__arrow} src='/arrow.svg' alt='scroll to top' />
        <div className={style.list__container}>
          <img className={style.list__jojo__img} src='/img/jojo4.jpg' />
          <div className={style.list__inner}>
            <h1 className={style.list__title}>Список аниме</h1>
            <Filters setParams={setParams} />
            {
              <div className={style.list__cards}>
                {
                  newAnime.map((item, id) => (
                    <AnimeCard key={`${item.id}-${id}`} item={item} id={id}/>
                  ))
                }
              </div>
            }
            {
              count === totalCount ?
                <div className={style.box}>
                  <p className={style.box__end}>С этими фильтрами, аниме больше нет.</p>
                </div>
                :
                totalCount === 0 ?
                  <div className={style.box}>
                    <p className={style.box__end}>С этими фильтрами, аниме больше нет.</p>
                  </div>
                  :
                  loading === true ?
                    <div className={style.box}>
                      <p className={style.box__loading}>Loading...</p>
                    </div>
                    :
                    <div className={style.box}>
                      <button onClick={fetchTrue} className={style.box__next}>ЕЩЕ</button>
                    </div>
            }
          </div>
          <img className={style.list__dio__img} src='/img/dio4.jpg' />
        </div>
      </main>
    </Layout>
  </>)
}

export default App
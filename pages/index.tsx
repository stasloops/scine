import Link from "next/link"
import style from '../styles/list.module.scss'
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import Layout from "../layout/Layout"
import Filters from "../components/filters/Filters"
import Image from "next/image"

const App = () => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [pages, setPages] = useState<any>(undefined)
  const [anime, setAnime] = useState<any[]>([])
  const [newAnime, setNewAnime] = useState<any[]>([])
  const [params, setParams] = useState<any>({ valueSort: 'shikimori_rating', valueGenres: '', valueType: 'tv', valueYear: '' })
  const [opacity, setOpacity] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const onScroll = () => {
    window.scrollTo(0, 0)
  }

  const fetchTrue = () => {
    if (fetching === false) {
      setFetching(true)
    }else{
      setFetching(false)
      setFetching(true)
    }
  }

  useEffect(() => {
    setPages(undefined)
    setAnime([])
    setFetching(true)
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

  useEffect(() => {
    if (fetching === true) {
      const fetchAnime = async () => {
          setLoading(true)
          await axios.get(pages?.next_page === undefined ? `https://kodikapi.com/list?token=30ef128890b06e03700a3628b91c87c2&with_material_data=true&translation_id=609,739,2068,557,827&limit=35&sort=${params.valueSort}&anime_genres=${params.valueGenres}&anime_kind=${params.valueType}${params.valueYear.length === 0 ? '' : '&year=' + params.valueYear}` : `${pages.next_page}&with_material_data=true&translation_id=609,739,2068,557,827&limit=35&sort=${params.valueSort}&anime_genres=${params.valueGenres}&anime_kind=${params.valueType}${params.valueYear.length === 0 ? '' : '&year=' + params.valueYear}`)
          .then(res => {
            setPages(res.data)
            setAnime([...anime, ...res.data.results])
            setLoading(false)
            setFetching(false)
          })
          .catch((e: AxiosError) => {
            setError(e)
            setLoading(false)
            setFetching(false) 
          })
      }
      fetchAnime()
    }
  }, [fetching])

  useEffect(() => {
    console.log(loading);

  }, [loading])
  

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
    anime.forEach((p: any) => dataMap.set(p.worldart_link, p));
    setNewAnime([...dataMap.values()])
  }, [anime])

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

                    <Link key={`${item.id}-${id}`} href={`/anime/${item.id}`} >
                      <a className={style.list__card}>
                        <img className={style.list__card__img} src={item.material_data?.poster_url} alt='anime poster' />
                        <div className={style.list__card__content}>
                          <h2 className={style.list__card__title}>{item.material_data?.anime_title}</h2>
                          <span>
                            <span className={style.list__card__episodes}>{item.last_season === undefined ? "" : item.last_season + " сезон"} </span>
                            <span className={style.list__card__episodes}>{item.material_data?.anime_kind === "movie" ? "Фильм" : item.material_data?.anime_kind === 'tv' ? 'TV сериал' : item.material_data?.anime_kind === 'ova' ? 'OVA' : 'Спешл'}</span>
                          </span>
                        </div>
                      </a>
                    </Link>

                  ))
                }
              </div>
            }
            {
            error?.name === 'AxiosError' ?
            null
            :
            loading === true ?
              <h1 className={style.loading}>Loading...</h1>
              :
              <button onClick={fetchTrue} className={style.next}>ЕЩЕ</button>
            }
          </div>
          <img className={style.list__dio__img} src='/img/dio4.jpg' />
        </div>
      </main>
    </Layout>
  </>)
}

export default App
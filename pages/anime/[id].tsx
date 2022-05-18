import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import style from '../../styles/animePage.module.scss'
import { AnimeProps, KodikProps } from '../../type/type'

type AnimePageProps = {
    anime: AnimeProps
}

const AnimePage:FC<AnimePageProps> = ({anime}) => {
    const [animeLink, setAnimeLink] = useState<string>()
    const { query } = useRouter()

    const fetchLink = async () => {
        const res = await axios.get(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&id=${query.param}&with_material_data=true`)
        setAnimeLink(res.data.results[0].link)
    }

    useEffect(() => {
        if(query){
          fetchLink()
        }
    }, [query])

    return (<>
        <Layout title={`${anime.material_data?.title} ${anime.last_season ? '(' + anime.last_season + ' cезон)' : ''} смотреть онлайн — Аниме`} >
            <div className={style.anime__back_filter}>
            </div>
                <img src={anime.material_data?.poster_url} className={style.anime__background} />
                <div className={style.anime}>
                    <div className={style.anime__container}>
                        <div className={style.anime__inner}>
                            <div className={style.anime__info}>
                                <img className={style.anime__img} src={anime.material_data?.poster_url} alt='anime poster' />
                                <div className={style.anime__content}>
                                    <h1 className={style.anime__title}><span className={style.cae962}>{anime.material_data?.title}</span> <span className={style.list__card_episodes}>{anime.last_season ? " сезон " + anime?.last_season : ""} </span></h1>
                                    <p className={style.anime__description}>{anime.material_data?.anime_description}</p>
                                    <div className={style.anime__genres}><span>Жанры: </span>
                                        <span>
                                            {
                                                anime.material_data?.anime_genres.map((item, id) => (
                                                    <span key={id}>
                                                        <span className={style.anime__genres_item}>{item}</span><span className={style.anime__b}>,</span>
                                                    </span>
                                                ))
                                            }
                                        </span>
                                    </div>
                                    <span className={style.anime__year}>Год: {anime.year}</span>
                                </div>
                            </div>
                            <strong className={style.anime__video_title}>Смотреть аниме «<span className={style.cae962}>{anime.material_data?.title}</span>» онлайн</strong>
                            <iframe className={style.anime__video} src={animeLink}
                                allow="autoplay; fullscreen"
                            ></iframe>
                        </div>
                    </div>
                </div>
        </Layout>
    </>)
}

export default AnimePage

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const response = await axios.get<KodikProps>(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&id=${query.param}&with_material_data=true`)
    const anime: AnimeProps = response.data.results[0]
    return {
        props: { anime }
    }
}

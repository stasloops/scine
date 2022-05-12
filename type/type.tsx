type MaterialDataProps = {
    anime_genres: string[]
    anime_kind: string
    anime_title: string
    anime_description: string
    poster_url: string
    title: string
    title_en: string
    
}

export type AnimeProps = {
    id: string
    last_season: number
    link: string
    worldart_link: string
    year: number
    material_data: MaterialDataProps

}

export type KodikProps = {
    next_page: string
    results: AnimeProps[]
    total: number 
}

export type ValueProps = {
    valueSort: string
    valueGenres: string
    valueType: string
    valueYear: string
}
import React, { FC, memo, useEffect, useState } from 'react'
import style from '../../styles/filters.module.scss'
import { ValueProps } from '../../type/type'
import Genre from '../genre/Genre'
import { filterDataGenres, filterDataSort, filterDataType, filterDataYear } from './filter-data'

type FiltersProps = {
    setParams: (value: ValueProps) => void
}

const Filters: FC<FiltersProps> = ({ setParams }) => {
    const [value, setValue] = useState<ValueProps>({ valueSort: 'shikimori_rating', valueGenres: '', valueType: 'tv', valueYear: '' })
    const [genre, setGenre] = useState<string>('')
    const [activeGenre, setActiveGenre] = useState<string[]>([])

    const handleGenre = (gen: string) => {
        const index = activeGenre.findIndex((ele: string) => ele === gen)
        if (index === -1) {
            setActiveGenre([...activeGenre, gen])
        }
        else {
            activeGenre.splice(index, 1)
            setGenre(activeGenre.join(','))
        }
    }

    useEffect(() => {
        setGenre(activeGenre.join(','))
    }, [activeGenre])

    useEffect(() => {
        setValue({ ...value, valueGenres: genre })
    }, [genre])

    useEffect(() => {
        setParams(value)
    }, [value])

    const changeValueSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue({ ...value, valueSort: e.target.value })
    }

    const changeValueType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue({ ...value, valueType: e.target.value })
    }

    const changeValueYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue({ ...value, valueYear: e.target.value })
    }

    return (
        <div className={style.filters}>
            <div className={style.filters__inner}>
                <h3 className={style.filters__title}>Фильтры</h3>
                <form className={style.filters__genres}>
                    <div className={style.filters__left}>
                        <label className={style.filters__left_item}>
                            <h5 className={style.filters__genres_title}>Сортировка по</h5>
                            <select value={value.valueSort} onChange={e => changeValueSort(e)} className={style.filters__sort}>
                                {
                                    filterDataSort.map((item, id) => (
                                        <option key={id} value={item.value} className={style.filters__sort_item}>
                                            {item.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className={style.filters__left_item}>
                            <h5 className={style.filters__genres_title}>Тип</h5>
                            <select value={value.valueType} onChange={e => changeValueType(e)} className={style.filters__sort}>
                                <option value='' className={style.filters__sort_item}>
                                    Все типы
                                </option>
                                {
                                    filterDataType.map((item, id) => (
                                        <option key={id} value={item.value} className={style.filters__sort_item}>
                                            {item.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className={style.filters__left_item}>
                            <h5 className={style.filters__genres_title}>Год</h5>
                            <select value={value.valueYear} onChange={e => changeValueYear(e)} className={style.filters__sort}>
                                <option value='' className={style.filters__sort_item}>
                                    Год
                                </option>
                                {
                                    filterDataYear.map((item, id) => (
                                        <option key={id} value={item.value} className={style.filters__sort_item}>
                                            {item.value}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>
                    <label className={style.filters__genres_content}>
                        <h5 className={style.filters__genres_title}>Жанры</h5>
                        <div className={style.filters__genre}>
                            {
                                filterDataGenres.map((item, id) => (
                                    <Genre handleGenre={handleGenre} key={id} item={item} />
                                ))
                            }
                        </div>
                    </label>
                </form>
            </div>
        </div >
    )
}

export default memo(Filters)
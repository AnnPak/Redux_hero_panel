import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import {useHttp} from '../../hooks/http.hook';
import { fetchFilters, activeFilterChanged } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    const filterHeros = (element) => {
        dispatch(activeFilterChanged(element));
    }

    if(filtersLoadingStatus === "loading"){
        <Spinner/>
    }else if (filtersLoadingStatus === "error"){
        <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    const RenderFilters = () => {
        return(
            filters.map((item, i) => {
                let isActive = item.name === activeFilter ? ' active' : '';
                let className = 'btn ' + item.className + isActive;
                return(
                    <button 
                        className={className} 
                        key={i}
                        onClick={() => filterHeros(item.name)}>
                        {item.label}
                    </button>
                )
            })

        )
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <RenderFilters/>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
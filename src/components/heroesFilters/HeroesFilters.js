import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {useHttp} from '../../hooks/http.hook';
import { filtersFetched, filtersFetchingError, activeFilterChanged, filtersFetching } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    const {filters} = useSelector(state => state);

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters", 'GET')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    const filterHeros = (element) => {
        dispatch(activeFilterChanged(element));
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.map((item, i) => {
                            let className = 'btn ' + item.className;
                            return(
                                <button 
                                    className={className} 
                                    key={i}
                                    onClick={() => filterHeros(item.name)}>
                                    {item.label}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { heroAdded } from '../heroesList/heroesSlice';
import {useHttp} from '../../hooks/http.hook';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();

    const {filters} = useSelector(state => state.filters);

    const addNewItem = useCallback((values) => {
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(values))
        .then(data => dispatch(heroAdded(data)))
        .catch(err => console.log(err))

    }, [request])

    return (
        <Formik
            
            initialValues={{ name: '', description: '', element: '' }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле'),
                description: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .max(600, "Максимум 600 символов")
                    .required('Обязательное поле'),
                element: Yup.string()
                    .required('Обязательное поле')
            })}

            onSubmit={data => addNewItem(data)}
        >
            {({ setFieldValue }) => (
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Как меня зовут?" />
                    </div>

                    <ErrorMessage className="error" name="name" component="div" />

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <Field
                            name="text"
                            name="description"
                            className="form-control"
                            id="text"
                            as="textarea"
                            placeholder="Что я умею?"
                            style={{ "height": '130px' }} />
                    </div>

                    <ErrorMessage className="error" name="description" component="div" />

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field
                            required
                            className="form-select"
                            id="element"
                            name="element"
                            as="select">
                            <option >Я владею элементом...</option>
                            {
                                filters.map((item, i) => {
                                    if( i===0 ) return '';
                                    return(
                                        <option value={item.name} key={i}>{item.label}</option>
                                    )
                                })
                            }
                        </Field>

                        <ErrorMessage className="error" name="element" component="div" />
                    </div>

                    <Field
                        type="hidden"
                        name="id"
                        value=''
                        id="name" />

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={() => {setFieldValue("id", uuidv4()); }} >
                        Создать
                    </button>
                </Form>
            )}

        </Formik>
    )
}

export default HeroesAddForm;
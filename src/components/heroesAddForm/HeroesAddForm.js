import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(500, 'Too Long!')
        .required('Required'),
    element: Yup.string().email('Invalid email').required('Required'),
});

const HeroesAddForm = () => {
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

            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
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
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>

                    <ErrorMessage className="error" name="element" component="div" />
                </div>

                <button type="submit" className="btn btn-primary">
                    Создать
                </button>
            </Form>

        </Formik>
    )
}

export default HeroesAddForm;
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TodoForm = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const addTask = (task) => {
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const initialValues = {
        task: '',
    };

    const validate = (values) => {
        const errors = {};
        if (!values.task || values.task.trim().length < 5) {
            errors.task = 'Мінімальна довжина поля - 5 символів';
        }
        return errors;
    };

    const handleSubmit = (values, { resetForm }) => {
        addTask(values.task);
        resetForm();
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="task">Завдання:</label>
                            <Field type="text" id="task" name="task" placeholder="Введіть нове завдання" />
                            <ErrorMessage name="task" component="div" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Додати завдання
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span>{task}</span>
                        <button onClick={() => removeTask(index)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoForm;

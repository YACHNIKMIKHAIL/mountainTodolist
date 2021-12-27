import React, {ChangeEvent, useState} from 'react';

export type TasksStateType= { [key: string]: Array<TaskType> }
export type TodolistsType={
    id:string
    title:string
    filter:FilterType
}
export type FilterType = 'all' | 'complited' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId:string,id: string) => void
    changeFilter: (todolistId:string,filter: FilterType) => void
    addTask: (todolistId:string,title: string) => void
    changeTaskStatus: (todolistId:string,id: string, isDone: boolean) => void
    filter:FilterType
    todolistId:string
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId,title.trim())
            setError(false)
            setTitle('')
        } else {
            setError(true)
        }

    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const changeFilter = (filter: FilterType) => {
        props.changeFilter(props.todolistId,filter)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error ? <div className={'error-message'}>Title is required !</div> : ''}
        </div>
        <ul>
            {props.tasks.map(m => {
                const removeTask = () => {
                    props.removeTask(props.todolistId,m.id)
                }
                const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistId,m.id, e.currentTarget.checked)
                }
                return <li key={m.id} className={m.isDone?'is-done':''}>
                    <input type="checkbox" checked={m.isDone}
                           onChange={onChangeCheckboxHandler}/>
                    <span>{m.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter==='all'?'active-filter':''}
                onClick={() => changeFilter('all')}>All</button>
            <button className={props.filter==='active'?'active-filter':''}
                onClick={() => changeFilter('active')}>Active</button>
            <button className={props.filter==='complited'?'active-filter':''}
                onClick={() => changeFilter('complited')}>Completed</button>
        </div>
    </div>
}

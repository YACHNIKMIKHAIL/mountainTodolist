import React, {ChangeEvent, useState} from 'react';
import AddItemForm from "./AddItemForm";
import EditSpan from "./EditSpan";

export type TasksStateType = { [key: string]: Array<TaskType> }
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
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
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, id: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {


    const changeFilter = (filter: FilterType) => {
        props.changeFilter(props.todolistId, filter)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    return <div>
        <h3>
            <EditSpan title={props.title} callback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm callback={addTask}/>
        <ul>
            {props.tasks.map(m => {
                const removeTask = () => {
                    props.removeTask(props.todolistId, m.id)
                }
                const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistId, m.id, e.currentTarget.checked)
                }
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(props.todolistId, m.id, title)
                }
                return <li key={m.id} className={m.isDone ? 'is-done' : ''}>
                    <input type="checkbox" checked={m.isDone}
                           onChange={onChangeCheckboxHandler}/>
                    <EditSpan title={m.title} callback={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilter('all')}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilter('active')}>Active
            </button>
            <button className={props.filter === 'complited' ? 'active-filter' : ''}
                    onClick={() => changeFilter('complited')}>Completed
            </button>
        </div>
    </div>
}

import React, {ChangeEvent, useState} from 'react';
import AddItemForm from "./AddItemForm";
import EditSpan from "./EditSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";

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
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
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
                return (<li key={m.id} className={m.isDone ? 'is-done' : ''}>
                    <Checkbox checked={m.isDone}
                              onChange={onChangeCheckboxHandler} defaultChecked color="secondary"/>
                    {/*<li key={m.id} className={m.isDone ? 'is-done' : ''}>*/}
                    {/*    <input type="checkbox" checked={m.isDone}*/}
                    {/*          onChange={onChangeCheckboxHandler}/>*/}

                    <EditSpan title={m.title} callback={changeTaskTitle}/>
                    {/*<button onClick={removeTask}>x</button>*/}
                    <IconButton aria-label="delete" size="small" onClick={removeTask}>
                        <Delete fontSize="small"/>
                    </IconButton>
                </li>)
            })}
        </ul>
        <div>
            {/*<button className={props.filter === 'all' ? 'active-filter' : ''}*/}
            {/*        onClick={() => changeFilter('all')}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? 'active-filter' : ''}*/}
            {/*        onClick={() => changeFilter('active')}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'complited' ? 'active-filter' : ''}*/}
            {/*        onClick={() => changeFilter('complited')}>Completed*/}
            {/*</button>*/}
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    size={props.filter === 'all' ? 'medium' : 'small'}
                    onClick={() => changeFilter('all')}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    size={props.filter === 'active' ? 'medium' : 'small'}
                    onClick={() => changeFilter('active')}>
                Active
            </Button>

            <Button variant={props.filter === 'complited' ? 'contained' : 'outlined'}
                    size={props.filter === 'complited' ? 'medium' : 'small'}
                    onClick={() => changeFilter('complited')}>
                Completed
            </Button>
        </div>
    </div>
}

import React, {ChangeEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditSpan from "./EditSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {rootReducerType} from "./State/store";

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

    const tasksII = useSelector<rootReducerType, TasksStateType>(state => state.tasks)

    return <div>
        <h3 style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgb(161,6,159)',
            height: '2vh'
        }}>
            <EditSpan title={props.title} callback={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm callback={addTask}/>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between'}}>
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
                return (<div key={m.id} style={m.isDone
                    ? {
                        opacity: '0.5',
                        color: 'white',
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                    : {
                        opacity: '1',
                        color: 'black',
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Checkbox checked={m.isDone}
                              onChange={onChangeCheckboxHandler} defaultChecked color="secondary"/>
                    <EditSpan title={m.title} callback={changeTaskTitle}/>
                    <IconButton aria-label="delete" size="small" onClick={removeTask}>
                        <Delete fontSize="small"/>
                    </IconButton>
                </div>)
            })}
        </div>
        <div>
            <Button
                variant={props.filter === 'all' ? 'contained' : 'outlined'}
                size={props.filter === 'all' ? 'medium' : 'small'}

                onClick={() => changeFilter('all')}>
                All
            </Button>
            <Button
                variant={props.filter === 'active' ? 'contained' : 'outlined'}
                size={props.filter === 'active' ? 'medium' : 'small'}

                onClick={() => changeFilter('active')}>
                Active
            </Button>

            <Button
                variant={props.filter === 'complited' ? 'contained' : 'outlined'}
                size={props.filter === 'complited' ? 'medium' : 'small'}

                onClick={() => changeFilter('complited')}>
                Completed
            </Button>
        </div>
    </div>
}

import React, {ChangeEvent, useCallback} from 'react';
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {EditSpan} from "./EditSpan";
import {AddItemForm} from "./AddItemForm";
import {addTaskAC, changeTaskSTATUSAC, chanheTaskAC, removeTaskAC} from "./State/actionsTasks";
import {
    chandeTodolistFilterAC,
    chandeTodolistTitleAC, changeTodolistsThunk,
    deleteTodolistsThunk,
    removeTodolistAC
} from "./State/actionsTodolists";
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
    todolistId: string
}

const TodolistMemo = ({ todolistId}: PropsType) => {
    const tasks=useSelector<rootReducerType,Array<TaskType>>(state=>state.tasks[todolistId])
    const todolist=useSelector<rootReducerType,TodolistsType>(state=>state.todolists.filter(f=>f.id===todolistId)[0])
    const actualFilter=todolist.filter

    console.log(todolistId)
    console.log(actualFilter)
    const dispatch = useDispatch()
    const changeFilter = useCallback((filter: FilterType) => {
        dispatch(chandeTodolistFilterAC(todolistId, filter))
    }, [dispatch, todolistId])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch, todolistId])
    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolistsThunk(todolistId))
    }, [dispatch, todolistId])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistsThunk(todolistId, title))
    }, [dispatch, todolistId])

    let tasksForTodo = tasks
    if (actualFilter === 'active') {
        tasksForTodo = tasks.filter(f => !f.isDone)
    }
    if (actualFilter === 'complited') {
        tasksForTodo = tasks.filter(f => f.isDone)
    }


    return <div key={todolistId}>
        <h3 style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgb(161,6,159)',
            height: '2vh'
        }}>
            <EditSpan title={todolist.title} callback={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm callback={addTask}/>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between'}}>
            {tasksForTodo.map((m) => {
                const removeTask = () => {
                    dispatch(removeTaskAC(todolistId, m.id))
                }
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskSTATUSAC(todolistId, m.id, e.currentTarget.checked))
                }

                const changeTaskTitle = (title: string) => {
                    dispatch(chanheTaskAC(todolistId, m.id, title))
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
                              onChange={changeTaskStatus}  color="secondary"/>
                    <EditSpan title={m.title} callback={changeTaskTitle}/>
                    <IconButton aria-label="delete" size="small" onClick={removeTask}>
                        <Delete fontSize="small"/>
                    </IconButton>
                </div>)
            })}
        </div>
        <div>
            <Button
                variant={actualFilter === 'all' ? 'contained' : 'outlined'}
                size={actualFilter === 'all' ? 'medium' : 'small'}
                style={{
                    backgroundColor: actualFilter === 'all' ? 'rgba(109,4,234,0.37)' : '',
                    color: actualFilter === 'all' ? 'white' : 'rgba(109,4,234,0.93)'
                }}
                onClick={() => changeFilter('all')}>
                All
            </Button>
            <Button
                variant={actualFilter === 'active' ? 'contained' : 'outlined'}
                size={actualFilter === 'active' ? 'medium' : 'small'}
                style={{
                    backgroundColor: actualFilter === 'active' ? 'rgba(109,4,234,0.37)' : '',
                    color: actualFilter === 'active' ? 'white' : 'rgba(109,4,234,0.93)'
                }}
                onClick={() => changeFilter('active')}>
                Active
            </Button>

            <Button
                variant={actualFilter === 'complited' ? 'contained' : 'outlined'}
                size={actualFilter === 'complited' ? 'medium' : 'small'}
                style={{
                    backgroundColor: actualFilter === 'complited' ? 'rgba(109,4,234,0.37)' : '',
                    color: actualFilter === 'complited' ? 'white' : 'rgba(109,4,234,0.93)'
                }}
                onClick={() => changeFilter('complited')}>
                Completed
            </Button>
        </div>
    </div>
}

export const Todolist = React.memo(TodolistMemo)
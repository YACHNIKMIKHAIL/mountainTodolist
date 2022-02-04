import React, {ChangeEvent, useCallback, useState} from 'react';
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import EditSpan from "./EditSpan";
import {AddItemForm} from "./AddItemForm";
import {addTaskThunk, deleteTaskThunk, setTaskThunk, updateTaskThunk} from "./State/actionsTasks";
import {chandeTodolistFilterAC, changeTodolistsThunk, deleteTodolistsThunk} from "./State/actionsTodolists";
import {rootReducerType} from "./State/store";
import {MountainTaskType, MountainTodolistType} from "./State/api";
import CollectionsIcon from '@mui/icons-material/Collections';

export type TasksStateType = { [key: string]: Array<MountainTaskType> }
export type TodolistsType = MountainTodolistType & {
    filter: FilterType
}
export type FilterType = 'all' | 'complited' | 'active' | 'disabled'

type PropsType = {
    todolist: TodolistsType
}

const Todolist = React.memo(({todolist}: PropsType) => {
        const tasks = useSelector<rootReducerType, Array<MountainTaskType>>(state => state.tasks[todolist.id])
        const actualFilter = todolist.filter
        const dispatch = useDispatch()

        const [showTasks, setShowTasks] = useState<boolean>(false)
        const getTasks = useCallback((todolistId: string, show: boolean) => {
            dispatch(setTaskThunk(todolistId))
            setShowTasks(show)
        }, [dispatch])
        const changeFilter = useCallback((filter: FilterType) => {
            dispatch(chandeTodolistFilterAC(todolist.id, filter))
            getTasks(todolist.id, true)
        }, [dispatch, todolist.id, getTasks])
        const addTask = useCallback((title: string) => {
            dispatch(addTaskThunk(todolist.id, title))
            getTasks(todolist.id, true)
        }, [dispatch, todolist.id, getTasks])
        const removeTodolist = useCallback(() => {
            dispatch(deleteTodolistsThunk(todolist.id))
        }, [dispatch, todolist.id])
        const changeTodolistTitle = useCallback((title: string) => {
            dispatch(changeTodolistsThunk(todolist.id, title))
        }, [dispatch, todolist.id])


        let tasksForTodo = tasks
        if (actualFilter === 'active') {
            tasksForTodo = tasks.filter(f => f.status === 0)
        }
        if (actualFilter === 'complited') {
            tasksForTodo = tasks.filter(f => f.status !== 0)
        }


        return <div key={todolist.id}>
            <h3 style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'rgb(161,6,159)',
                height: '2vh',
            }}>
                <IconButton onClick={() => getTasks(todolist.id, !showTasks)}>
                    <CollectionsIcon/>
                </IconButton>
                <EditSpan title={todolist.title} callback={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTask}/>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between'}}>
                {showTasks
                    ? <>{tasksForTodo.map((m) => {
                        const removeTask = () => {
                            dispatch(deleteTaskThunk(todolist.id, m.id))
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(updateTaskThunk(todolist.id, m.id, e.currentTarget.checked ? {
                                status: 2,
                                title: m.title
                            } : {
                                status: 0,
                                title: m.title
                            }))
                        }

                        const changeTaskTitle = (title: string) => {
                            dispatch(updateTaskThunk(todolist.id, m.id, {title}))
                        }
                        return (<div key={m.id} style={m.status !== 0
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
                            <Checkbox checked={m.status !== 0}
                                      onChange={changeTaskStatus} color="secondary"/>
                            <EditSpan title={m.title} callback={changeTaskTitle}/>
                            <IconButton aria-label="delete" size="small" onClick={removeTask}>
                                <Delete fontSize="small"/>
                            </IconButton>
                        </div>)
                    })}</>
                    : <></>}
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
    },
)
export default Todolist
import React, {ChangeEvent, useCallback, useState} from 'react';
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import EditSpan from "../../Components/EditSpan";
import {AddItemForm} from "../../Components/AddItemForm";
import {addTaskThunk, deleteTaskThunk, setTaskThunk, updateTaskThunk} from "../actionsTasks";
import {chandeTodolistFilterAC, changeTodolistsThunk, deleteTodolistsThunk} from "../actionsTodolists";
import {rootReducerType} from "../../App/store";
import CollectionsIcon from '@mui/icons-material/Collections';
import {MountainTaskType, MountainTodolistType} from "../../Api/mountainApi";
import {mountainStatusTypes} from "../../App/MountainAppReducer";
import MountainTask from "./Task/MountainTask";

export type TasksStateType = { [key: string]: Array<MountainTaskType & { taskStatus: mountainStatusTypes }> }
export type TodolistsType = MountainTodolistType & {
    filter: FilterType, todolistStatus: mountainStatusTypes
}
export type FilterType = 'all' | 'complited' | 'active'

type PropsType = {
    todolist: TodolistsType
}

const Todolist = React.memo(({todolist}: PropsType) => {
        const tasks = useSelector<rootReducerType, Array<MountainTaskType>>(state => state.tasks[todolist.id])
        const actualFilter = todolist.filter
        const dispatch = useDispatch()
        const todolistStatus = useSelector<rootReducerType, mountainStatusTypes>(state => state.todolists.filter(f => f.id === todolist.id)[0].todolistStatus)

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


        return <div>
            <h3 style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'rgb(161,6,159)',
                height: '2vh',
            }}>
                <IconButton onClick={() => getTasks(todolist.id, !showTasks)} disabled={todolistStatus === 'loading'}>
                    <CollectionsIcon/>
                </IconButton>
                <EditSpan title={todolist.title} callback={changeTodolistTitle} disabled={todolistStatus === 'loading'}/>
                <IconButton aria-label="delete" onClick={removeTodolist} disabled={todolistStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTask}/>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-between'}}>
                {showTasks
                    ? <>{tasksForTodo.map((m,i) => {
                        return <MountainTask key={i} status={m.status} taskId={m.id} todolistId={m.todoListId} title={m.title}/>
                    })
                    }</>
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
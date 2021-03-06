import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditSpan from "../../../Components/EditSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses} from "../../../Api/mountainApi";
import {deleteTaskThunk, updateTaskThunk} from "../../actionsTasks";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../App/store";
import {mountainStatusTypes} from "../../../App/MountainAppReducer";
import {CircularProgress} from "@mui/material";

const mountainTaskStyle = {
    done: {
        opacity: '0.5',
        color: 'white',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    active: {
        opacity: '1',
        color: 'black',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}
type MountainTaskType = {
    status: TaskStatuses
    taskId: string
    todolistId: string
    title: string
}
const MountainTask = ({status, taskId, title, todolistId}: MountainTaskType) => {
    const dispatch = useDispatch()
    const taskStatus = useSelector<rootReducerType, mountainStatusTypes>(state => state.tasks[todolistId].filter(f => f.id === taskId)[0].taskStatus)
    const removeTask = () => {
        dispatch(deleteTaskThunk(todolistId, taskId))
    }
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskThunk(todolistId, taskId, e.currentTarget.checked ? {
            status: TaskStatuses.Completed,
            title: title
        } : {
            status: TaskStatuses.New,
            title: title
        }))
    }, [dispatch, taskId, title, todolistId])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskThunk(todolistId, taskId, {title}))
    }, [dispatch, taskId, todolistId])
    return (
        <div key={taskId} style={status !== TaskStatuses.New
            ? mountainTaskStyle.done
            : mountainTaskStyle.active}>
            <Checkbox checked={status !== TaskStatuses.New}
                      onChange={changeTaskStatus} color="secondary" disabled={taskStatus === 'loading'}/>
            {taskStatus === 'loading'
                ? <>
                    <CircularProgress color="secondary" style={{color: '#E26BE9'}} size={25}/>
                    <CircularProgress color="secondary" style={{color: '#8034CF'}} size={25}/>
                    <CircularProgress color="secondary" style={{color: '#04147F'}} size={25}/>
                </>
                : <EditSpan title={title} callback={changeTaskTitle}/>}
            <IconButton aria-label="delete" size="small" onClick={removeTask} disabled={taskStatus === 'loading'}>
                <Delete fontSize="small"/>
            </IconButton>
        </div>
    );
};

export default MountainTask;
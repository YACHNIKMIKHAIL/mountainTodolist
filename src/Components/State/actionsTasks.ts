import {Dispatch} from "redux";
import {MountainTaskType, tasksApi} from "./api";

export enum Actions_Tasks_Types {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK = 'CHANGE_TASK',
    SET_TASKS = 'SET_TASKS'
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: Actions_Tasks_Types.REMOVE_TASK, todoId, taskId
} as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, item: MountainTaskType) => ({
    type: Actions_Tasks_Types.ADD_TASK, todoId, item
} as const)

export type changeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todoId: string,taskId: string, body: { title:string,status?:number }) => ({
    type: Actions_Tasks_Types.CHANGE_TASK, todoId,taskId, body
} as const)

export type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todoId: string, items: Array<MountainTaskType>,) => ({
    type: Actions_Tasks_Types.SET_TASKS, todoId, items
} as const)

export const setTaskThunk = (todoId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todoId)
            .then((res) => {
                    dispatch(setTaskAC(todoId, res.data.items))
                }
            )
    }
}
export const addTaskThunk = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.addTasks(todoId, title)
            .then((res) => {
                    dispatch(addTaskAC(todoId, res.data.data.item))
                }
            )
    }
}
export const deleteTaskThunk = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.deleteTasks(todoId, taskId)
            .then(() => {
                    dispatch(removeTaskAC(todoId, taskId))
                }
            )
    }
}
export const updateTaskThunk = (todoId: string, taskId: string, body: { title:string,status?:number }) => {
    return (dispatch: Dispatch) => {
        debugger
        tasksApi.updateTasks(todoId, taskId, body)
            .then(() => {
                debugger
                    dispatch(changeTaskAC(todoId,taskId, body))
                }
            )
    }
}
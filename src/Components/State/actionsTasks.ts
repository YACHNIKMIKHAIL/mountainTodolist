import {Dispatch} from "redux";
import {MountainTaskType, MountainTodolistType, tasksApi, todolistApi} from "./api";
import {chandeTodolistTitleAC} from "./actionsTodolists";

export enum Actions_Tasks_Types {
    REMOVE_TASK='REMOVE_TASK',
    ADD_TASK='ADD_TASK',
    CHANGE_TASK='CHANGE_TASK',
    CHANGE_TASKS_STATUS='CHANGE_TASKS_STATUS',
    SET_TASKS='SET_TASKS'
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
export const changeTaskAC = (todoId: string, taskId: string, title: string) => ({
    type: Actions_Tasks_Types.CHANGE_TASK, todoId, taskId, title
} as const)

export type changeTaskSTATUSACType = ReturnType<typeof changeTaskSTATUSAC>
export const changeTaskSTATUSAC = (todoId: string, taskId: string, isDone: boolean) => ({
    type: Actions_Tasks_Types.CHANGE_TASKS_STATUS, todoId, taskId, isDone
} as const)

export type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todoId: string, items: Array<MountainTaskType>,) => ({
    type: Actions_Tasks_Types.SET_TASKS, todoId, items
} as const)

export const setTaskThunk = (todoId:string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todoId)
            .then((res) => {
                debugger
                    dispatch(setTaskAC(todoId,res.data.items))
                }
            )
    }
}
export const addTaskThunk = (todoId:string,title: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.addTasks(todoId,title)
            .then((res) => {
                    debugger
                    dispatch(addTaskAC(todoId,res.data.data.item))
                }
            )
    }
}
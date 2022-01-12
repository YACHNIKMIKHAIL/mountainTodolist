import {v1} from "uuid";
import {FilterType} from "../Todolist";

export enum Actions_Tasks_Types {
    REMOVE_TASK='REMOVE_TASK',
    ADD_TASK='ADD_TASK',
    CHANGE_TASK='CHANGE_TASK',
    CHANGE_TASKS_STATUS='CHANGE_TASKS_STATUS'
}
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: Actions_Tasks_Types.REMOVE_TASK, todoId, taskId
} as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, title: string) => ({
    type: Actions_Tasks_Types.ADD_TASK, todoId, title
} as const)

export type chanheTaskACType = ReturnType<typeof chanheTaskAC>
export const chanheTaskAC = (todoId: string, taskId: string, title: string) => ({
    type: Actions_Tasks_Types.CHANGE_TASK, todoId, taskId, title
} as const)

export type changeTaskSTATUSACType = ReturnType<typeof changeTaskSTATUSAC>
export const changeTaskSTATUSAC = (todoId: string, taskId: string, isDone: boolean) => ({
    type: Actions_Tasks_Types.CHANGE_TASKS_STATUS, todoId, taskId, isDone
} as const)
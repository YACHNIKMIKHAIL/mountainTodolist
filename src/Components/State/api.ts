import axios, {AxiosResponse} from "axios";
import {TodolistsType} from "../Todolist";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers:
        {"API-KEY": "3054dc60-1df1-480c-a08f-6e543a8dcaf0"}
})

export type MountainTodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type RespType<T = {}> = {
    data: T,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>(`/todo-lists`)
            .then(res => {
                return res
            })
    },
    addTodolist(title: string) {
        debugger
        return instance.post<RespType<{ item: MountainTodolistType }>, AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists`, {title})
            .then(res => res)
    },
    deleteTodolist(todoId: string) {
        debugger
        return instance.delete<RespType>(`/todo-lists/${todoId}`)
            .then(res => res)
    },
    changeTodolist(todoId: string, title: string) {
        debugger
        return instance.put<RespType<{ item: MountainTodolistType }>, AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists/${todoId}`, {title})
            .then(res => res)
    }
}

export type MountainTaskType = {
    id: string,
    title: string,
    description: string | null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
    addedDate: string
}
export type MountainApiTaskType = {
    items: Array<MountainTaskType>
    totalCount: number
    error: string | null
}
export type AddUpdateTaskType = {
    data: {
        item: MountainTaskType
        totalCount: number
        error: string | null
    }
}
export type DeleteTaskType = {
    data: {},
    messages: string [],
    fieldsErrors: string[],
    resultCode: number
}
export const tasksApi = {
    getTasks(todoId: string) {
        debugger
        return instance.get<MountainApiTaskType>(`/todo-lists/${todoId}/tasks`)
            .then(res => res)
    },
    addTasks(todoId: string, title: string) {
        debugger
        return instance.post<AddUpdateTaskType>(`/todo-lists/${todoId}/tasks`, {title})
            .then(res => res)
    },
    deleteTasks(todoId: string, taskId: string) {
        debugger
        return instance.delete<DeleteTaskType>(`/todo-lists/${todoId}/tasks/${taskId}`)
            .then(res => res)
    },
    updateTasks(todoId: string, taskId: string, body: MountainTaskType) {
        debugger
        return instance.put<AddUpdateTaskType>(`/todo-lists/${todoId}/tasks/${taskId}`, {body})
            .then(res => res)
    },
}



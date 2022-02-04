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
    //  getTodolists() {
    //     return instance.get<TodolistsType[]>(`/todo-lists`)
    //         .then(res => {
    //             return res
    //         })
    // },
    async getTodolists() {
        return await instance.get<TodolistsType[]>(`/todo-lists`)
    },
    // addTodolist(title: string) {
    //     return instance.post<RespType<{ item: MountainTodolistType }>, AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists`, {title})
    //         .then(res => res)
    // },
    async addTodolist(title: string) {
        return await instance.post<RespType<{ item: MountainTodolistType }>, AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    // deleteTodolist(todoId: string) {
    //     return instance.delete<RespType>(`/todo-lists/${todoId}`)
    //         .then(res => res)
    // },
    async deleteTodolist(todoId: string) {
        return await instance.delete<RespType>(`/todo-lists/${todoId}`)
    },
    // changeTodolist(todoId: string, title: string) {
    //     return instance.put<RespType<{ item: MountainTodolistType }>, AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists/${todoId}`, {title})
    //         .then(res => res)
    // }
    async changeTodolist(todoId: string, title: string) {
        return await instance.put<RespType<{ item: MountainTodolistType }>, AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists/${todoId}`, {title})
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
    async getTasks(todoId: string) {
        return await instance.get<MountainApiTaskType>(`/todo-lists/${todoId}/tasks`)
    },
    async addTasks(todoId: string, title: string) {
        return await instance.post<AddUpdateTaskType>(`/todo-lists/${todoId}/tasks`, {title})
    },
    async deleteTasks(todoId: string, taskId: string) {
        return await instance.delete<DeleteTaskType>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
    async updateTasks(todoId: string, taskId: string, body: { title: string, status?: number }) {
        return await instance.put<AddUpdateTaskType>(`/todo-lists/${todoId}/tasks/${taskId}`, body)
    }
}



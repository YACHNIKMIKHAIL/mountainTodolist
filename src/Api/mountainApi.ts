import axios, {AxiosResponse} from "axios";
import {TodolistsType} from "../Features/Todolist/Todolist";
import {UpdateTaskModelType} from "../Features/actionsTasks";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers:
        {"API-KEY": "3054dc60-1df1-480c-a08f-6e543a8dcaf0"}
})

export const todolistApi = {
    async getTodolists() {
        return await instance.get<TodolistsType[]>(`/todo-lists`)
    },
    async addTodolist(title: string) {
        return await instance.post<RespType<{ item: MountainTodolistType }>,
            AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    async deleteTodolist(todoId: string) {
        return await instance.delete<RespType>(`/todo-lists/${todoId}`)
    },
    async changeTodolist(todoId: string, title: string) {
        return await instance.put<RespType<{ item: MountainTodolistType }>,
            AxiosResponse<RespType<{ item: MountainTodolistType }>>, { title: string }>(`/todo-lists/${todoId}`, {title})
    }
}

export const tasksApi = {
    async getTasks(todoId: string) {
        return await instance.get<MountainApiTaskType>(`/todo-lists/${todoId}/tasks`)
    },
    async addTasks(todoId: string, title: string) {
        return await instance.post<RespType<{
            item: MountainTaskType
        }>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    async deleteTasks(todoId: string, taskId: string) {
        return await instance.delete<DeleteTaskType>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
    async updateTasks(todoId: string, taskId: string, model: UpdateTaskModelType) {
        return await instance.put<RespType<{
            item: MountainTaskType
        }>>(`/todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type MountainTodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type RespType<T = {}> = {
    data: T,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
export type MountainTaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
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
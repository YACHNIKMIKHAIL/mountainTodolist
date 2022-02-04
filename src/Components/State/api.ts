import axios from "axios";
import {TodolistsType} from "../Todolist";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers:
        {"API-KEY": "3054dc60-1df1-480c-a08f-6e543a8dcaf0"}
})

export type MountainTodolistType= {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>(`/todo-lists`)
            .then(res => {
                return res
            })
    },
    postTodolist(title: string) {
        debugger
        return instance.post(`/todo-lists`, {title})
            .then(res => res.data)
    },
    deleteTodolist(todoId: string) {
        debugger
        return instance.delete(`/todo-lists/${todoId}`)
            .then(res => res.data)
    },
    changeTodolist(todoId: string, title: string) {
        debugger
        return instance.put(`/todo-lists/${todoId}`, {title})
            .then(res => res.data)
    }
}

export const tasksApi = {
    getTasks(todoId:string) {
        debugger
        return instance.get(`/${todoId}/tasks`)
            .then(res => {
                console.log(res.data)
                return res.data
            })
    },
    addTasks(todoId:string,title:string) {
        debugger
        return instance.post(`/${todoId}/tasks`,{title})
            .then(res => {
                console.log(res.data)
                return res.data
            })
    },

}



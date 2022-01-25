import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers:
        {"API-KEY": "b0713123-338a-4997-b226-9d38b65d5ff4"}
})

export const todolistApi = {
    getTodolists() {
        debugger
        return instance.get(`/todo-lists`)
            .then(res => {
                console.log(res.data)
                return res.data
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



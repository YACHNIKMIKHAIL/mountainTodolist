import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers:
        {"API-KEY": "b0713123-338a-4997-b226-9d38b65d5ff4"}
})

export const todolistApi={
    getTodolists(){
        debugger
        return instance.get(`/todo-lists`)
            .then(res=> {
                console.log(res.data)
                return res.data
            })
    },
    postTodolist(title:string){
        debugger
        return instance.post(`/todo-lists`,{title:title})
            .then(res=> res.data)
    }
}
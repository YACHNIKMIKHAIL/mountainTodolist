import {FilterType, TodolistsType} from "../Todolist";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        }
        default:
            return state
    }
}

type ActionType = removeTodolistACType | addTodolistACType | chandeTodolistFilterACType | chandeTodolistTitleACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST', id
    } as const
}
type addTodolistACType = ReturnType<typeof addTodolistAC>
const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST', title
    } as const
}
type chandeTodolistFilterACType = ReturnType<typeof chandeTodolistFilterAC>
const chandeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER', id, filter
    } as const
}
type chandeTodolistTitleACType = ReturnType<typeof chandeTodolistTitleAC>
const chandeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', id, title
    } as const
}
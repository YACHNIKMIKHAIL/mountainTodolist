import {FilterType, TodolistsType} from "../Todolist";
import {v1} from "uuid";

export const todolist1 = v1()
export const todolist2 = v1()
export const todolist3 = v1()
export const todolist4 = v1()
export const todolist5 = v1()
export const todolist6 = v1()
export const todolist7 = v1()
export const todolist8 = v1()
export const todolist9 = v1()

const initialState: Array<TodolistsType> = [
    {id: todolist1, title: 'What to learn?', filter: 'all'},
    {id: todolist2, title: 'What to buy?', filter: 'all'},
    {id: todolist3, title: 'What to fixie?', filter: 'all'},
    {id: todolist4, title: 'C чего начать?', filter: 'all'},
    {id: todolist5, title: 'Куда сходить?', filter: 'all'},
    {id: todolist6, title: 'Что пить?', filter: 'all'},
    {id: todolist7, title: 'Как жить теперь?', filter: 'all'},
    {id: todolist8, title: 'Что позырить?', filter: 'all'},
    {id: todolist9, title: 'Что подарить?', filter: 'all'}
]
export const todolistsReducer = (state = initialState, action: TodolistsActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todoId)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todoId, title: action.title, filter: "all"}]
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

export type TodolistsActionType = removeTodolistACType | addTodolistACType | chandeTodolistFilterACType | chandeTodolistTitleACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
const REMOVE_TODOLIST='REMOVE-TODOLIST'
export const removeTodolistAC = (todoId: string) => {
    return {
        type: REMOVE_TODOLIST, todoId
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
const ADD_TODOLIST='ADD-TODOLIST'
export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST, title, todoId:v1()
    } as const
}

type chandeTodolistFilterACType = ReturnType<typeof chandeTodolistFilterAC>
const CHANGE_TODOLIST_FILTER='CHANGE-TODOLIST-FILTER'
export const chandeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: CHANGE_TODOLIST_FILTER, id, filter
    } as const
}

type chandeTodolistTitleACType = ReturnType<typeof chandeTodolistTitleAC>
const CHANGE_TODOLIST_TITLE='CHANGE-TODOLIST-TITLE'
export const chandeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE, id, title
    } as const
}
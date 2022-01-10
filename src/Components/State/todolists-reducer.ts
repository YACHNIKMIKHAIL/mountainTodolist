import {FilterType, TodolistsType} from "../Todolist";
import {v1} from "uuid";
import {
    Actions_Todolists_Types,
    addTodolistACType,
    chandeTodolistFilterACType,
    chandeTodolistTitleACType,
    removeTodolistACType
} from "./actionsTodolists";

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
        case Actions_Todolists_Types.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.payload.todoId)
        }
        case Actions_Todolists_Types.ADD_TODOLIST: {
            return [{id: action.payload.todoId, title: action.payload.title, filter: "all"},...state]
        }
        case Actions_Todolists_Types.CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
        }
        case Actions_Todolists_Types.CHANGE_TODOLIST_TITLE: {
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        default:
            return state
    }
}

export type TodolistsActionType =
    removeTodolistACType
    | addTodolistACType
    | chandeTodolistFilterACType
    | chandeTodolistTitleACType
import {TodolistsType} from "./Todolist/Todolist";
import {v1} from "uuid";
import {
    Actions_Todolists_Types,
    addTodolistACType,
    chandeTodolistFilterACType,
    changeTodolistTitleACType, loadTodolistsACType,
    removeTodolistACType,
    setTodolistsACType
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


const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state = initialState, action: TodolistsActionType): Array<TodolistsType> => {
    switch (action.type) {
        case Actions_Todolists_Types.REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.payload.todoId)
        }
        case Actions_Todolists_Types.ADD_TODOLIST: {
            return [{...action.payload.todolist, filter: "all", todolistStatus: 'idle'}, ...state]
        }
        case Actions_Todolists_Types.CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
        }
        case Actions_Todolists_Types.CHANGE_TODOLIST_TITLE: {
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        case Actions_Todolists_Types.SET_TODOLISTS: {
            return [...action.payload.data]
        }
        case Actions_Todolists_Types.LOAD_TODOLIST: {
            return state.map(m => m.id === action.payload.todolistId ? {
                ...m, todolistStatus: action.payload.status
            } : m)
        }
        default:
            return state
    }
}

export type TodolistsActionType =
    removeTodolistACType
    | addTodolistACType
    | chandeTodolistFilterACType
    | changeTodolistTitleACType
    | setTodolistsACType
    | loadTodolistsACType
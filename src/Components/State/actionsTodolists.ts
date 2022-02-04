import {v1} from "uuid";
import {FilterType, TodolistsType} from "../Todolist";
import {AnyAction, Dispatch} from "redux";
import {MountainTodolistType, todolistApi} from "./api";
import {rootReducerType} from "./store";
import {TodolistsActionType} from "./todolists-reducer";

export enum Actions_Todolists_Types {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
    SET_TODOLISTS = 'SET_TODOLISTS'
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todoId: string) => {
    return {
        type: Actions_Todolists_Types.REMOVE_TODOLIST,
        payload: {todoId: todoId}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist:MountainTodolistType) => {
    return {
        type: Actions_Todolists_Types.ADD_TODOLIST,
        payload: {todolist}
    } as const
}

export type chandeTodolistFilterACType = ReturnType<typeof chandeTodolistFilterAC>
export const chandeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: Actions_Todolists_Types.CHANGE_TODOLIST_FILTER,
        payload: {id: id, filter: filter}
    } as const
}

export type chandeTodolistTitleACType = ReturnType<typeof chandeTodolistTitleAC>
export const chandeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: Actions_Todolists_Types.CHANGE_TODOLIST_TITLE,
        payload: {id: id, title: title}
    } as const
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (data: Array<TodolistsType>) => {
    return {
        type: Actions_Todolists_Types.SET_TODOLISTS,
        payload: {data}
    } as const
}

export const setTodolistsThunk = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodolists()
            .then( (res)=> {
                dispatch(setTodolistsAC(res.data))
                }
            )
    }
}

export const addTodolistsThunk = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.addTodolist(title)
            .then(data => {
                debugger
                    dispatch(addTodolistAC(data.data.data.item))
                }
            )
    }
}

export const deleteTodolistsThunk = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTodolist(todoId)
            .then(() => {
                debugger
                    dispatch(removeTodolistAC(todoId))
                }
            )
    }
}

export const changeTodolistsThunk = (todoId:string,title:string) => {
    return (dispatch: Dispatch) => {
        debugger
        todolistApi.changeTodolist(todoId,title)
            .then(() => {
                    dispatch(chandeTodolistTitleAC(todoId,title))
                }
            )
    }
}
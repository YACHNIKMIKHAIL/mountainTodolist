import {FilterType, TodolistsType} from "./Todolist/Todolist";
import {MountainThunk} from "../App/store";
import {MountainTodolistType, todolistApi} from "../Api/mountainApi";
import {mountainStatusTypes, setMountainStatus} from "../App/MountainAppReducer";
import {mountainNetworkHandler, mountainServerErrorHandler} from "../MountainUtils/MountainErrorUtils";

export enum Actions_Todolists_Types {
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_TODOLIST = 'ADD-TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
    SET_TODOLISTS = 'SET_TODOLISTS',
    LOAD_TODOLIST = 'LOAD_TODOLIST'
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todoId: string) => {
    return {
        type: Actions_Todolists_Types.REMOVE_TODOLIST,
        payload: {todoId: todoId}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: MountainTodolistType) => {
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

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
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
export type loadTodolistsACType = ReturnType<typeof loadTodolistsAC>
export const loadTodolistsAC = (todolistId: string, status: mountainStatusTypes) => {
    return {
        type: Actions_Todolists_Types.LOAD_TODOLIST,
        payload: {todolistId, status}
    } as const
}

export const getTodolistsThunk = (): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    try {
        let res = await todolistApi.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setMountainStatus('succesed'))
    } catch (e) {
        mountainNetworkHandler(e, dispatch)
    }
}

export const addTodolistsThunk = (title: string): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    try {
        let res = await todolistApi.addTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setMountainStatus('succesed'))
        } else {
            mountainServerErrorHandler(res.data, dispatch)
        }
    } catch (e) {
        mountainNetworkHandler(e, dispatch)
    }
}

export const deleteTodolistsThunk = (todoId: string): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    dispatch(loadTodolistsAC(todoId, 'loading'))

    try {
        await todolistApi.deleteTodolist(todoId)
        dispatch(removeTodolistAC(todoId))
        dispatch(setMountainStatus('succesed'))
    } catch (e) {
        mountainNetworkHandler(e, dispatch)
    }
}

export const changeTodolistsThunk = (todoId: string, title: string): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    dispatch(loadTodolistsAC(todoId, 'loading'))
    try {
        let mountainRes = await todolistApi.changeTodolist(todoId, title)
        if (mountainRes.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todoId, title))
            dispatch(setMountainStatus('succesed'))
            dispatch(loadTodolistsAC(todoId, 'succesed'))
        } else {
            mountainServerErrorHandler(mountainRes.data, dispatch)
            dispatch(loadTodolistsAC(todoId, 'failed'))
        }
    } catch (e) {
        mountainNetworkHandler(e, dispatch)
    }
}
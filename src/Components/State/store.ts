import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionType, todolistsReducer} from "./todolists-reducer";
import {TasksActionType, tasksReducer} from "./task-reducer";
import thunk, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type MountainActionsType = TodolistsActionType | TasksActionType

export type MountainThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    rootReducerType,
    unknown,
    MountainActionsType
    >
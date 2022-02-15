import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionType, todolistsReducer} from "../Features/todolists-reducer";
import {TasksActionType, tasksReducer} from "../Features/task-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {mountainAppReducer, mountainAppReducerActionsType} from "./MountainAppReducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: mountainAppReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type MountainActionsType = TodolistsActionType | TasksActionType | mountainAppReducerActionsType

export type MountainThunk<ReturnType = void> = ThunkAction<ReturnType,
    rootReducerType,
    unknown,
    MountainActionsType>
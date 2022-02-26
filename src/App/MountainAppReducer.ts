import {MountainThunk} from "./store";
import {mountainAuthAPI} from "../Api/mountainApi";
import {mountainNetworkHandler, mountainServerErrorHandler} from "../MountainUtils/MountainErrorUtils";
import {setIsLoggetInOnMountainAC} from "../Features/Login/mountainAuthReducer";

export enum MountainActions {
    SET_MOUNTAIN_STATUS = 'SET_MOUNTAIN_STATUS',
    SET_MOUNTAIN_ERROR = 'SET_MOUNTAIN_ERROR',
    INITIALIZE_MOUNTAIN = 'INITIALIZE_MOUNTAIN'
}

export type MountainAppInitStateType = {
    mountainStatus: mountainStatusTypes
    mountainError: string | null,
    isInitialized: boolean
}
export type mountainStatusTypes = 'idle' | 'loading' | 'succesed' | 'failed'
const mountainAppInitState: MountainAppInitStateType = {
    mountainStatus: 'idle',
    mountainError: null,
    isInitialized: false
}
export const mountainAppReducer = (state = mountainAppInitState, action: mountainAppReducerActionsType) => {
    switch (action.type) {
        case MountainActions.SET_MOUNTAIN_STATUS: {
            return {...state, mountainStatus: action.status}
        }
        case MountainActions.SET_MOUNTAIN_ERROR: {
            return {...state, mountainError: action.error}
        }
        case MountainActions.INITIALIZE_MOUNTAIN: {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}
export type mountainAppReducerActionsType =
    ReturnType<typeof setMountainStatus>
    | ReturnType<typeof setMountainError>
    | ReturnType<typeof setInitialised>
export const setMountainStatus = (status: mountainStatusTypes) => ({
    type: MountainActions.SET_MOUNTAIN_STATUS,
    status
} as const)
export const setMountainError = (error: string | null) => ({type: MountainActions.SET_MOUNTAIN_ERROR, error} as const)
export const setInitialised = (value: boolean) => ({type: MountainActions.INITIALIZE_MOUNTAIN, value} as const)
export const initalizeMeTC = (): MountainThunk => async dispatch => {
    dispatch(setMountainStatus('loading'))
    try {
        let mountain = await mountainAuthAPI.me()
        if (mountain.data.resultCode === 0) {
            dispatch(setIsLoggetInOnMountainAC(true))
        } else {
            mountainServerErrorHandler(mountain.data, dispatch)
            dispatch(setMountainStatus('failed'))
        }
    } catch (e) {
        mountainNetworkHandler(e, dispatch)
    } finally {
        dispatch(setInitialised(true))
        dispatch(setMountainStatus('succesed'))
    }
}


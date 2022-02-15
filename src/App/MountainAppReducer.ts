export type MountainAppInitStateType = {
    mountainStatus: mountainStatusTypes
    mountainError: string | null
}
export type mountainStatusTypes = 'idle' | 'loading' | 'succesed' | 'failed'
const mountainAppInitState: MountainAppInitStateType = {
    mountainStatus: 'idle',
    mountainError: null
}
export const mountainAppReducer = (state = mountainAppInitState, action: mountainAppReducerActionsType) => {
    switch (action.type) {
        case MountainActions.SET_MOUNTAIN_STATUS: {
            return {...state, mountainStatus: action.status}
        }
        case MountainActions.SET_MOUNTAIN_ERROR: {
            return {...state, mountainError: action.error}
        }
        default:
            return state
    }
}
export type mountainAppReducerActionsType = ReturnType<typeof setMountainStatus> | ReturnType<typeof setMountainError>
export const setMountainStatus = (status: mountainStatusTypes) => ({
    type: MountainActions.SET_MOUNTAIN_STATUS,
    status
} as const)
export const setMountainError = (error: string | null) => ({type: MountainActions.SET_MOUNTAIN_ERROR, error} as const)

export enum MountainActions {
    SET_MOUNTAIN_STATUS = 'SET_MOUNTAIN_STATUS',
    SET_MOUNTAIN_ERROR = 'SET_MOUNTAIN_ERROR'
}
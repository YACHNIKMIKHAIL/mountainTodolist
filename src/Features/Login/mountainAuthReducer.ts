import {MountainThunk} from "../../App/store";
import {setMountainStatus} from "../../App/MountainAppReducer";
import {mountainAuthAPI} from "../../Api/mountainApi";
import {mountainNetworkHandler, mountainServerErrorHandler} from "../../MountainUtils/MountainErrorUtils";

const initialAuthState = {
    isLoggedIn: false
}
type initialAuthStateType = typeof initialAuthState
export const mountainAuthReducer = (state = initialAuthState, action: authActionTypes): initialAuthStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
export type authActionTypes = ReturnType<typeof setIsLoggetInOnMountainAC>
export const setIsLoggetInOnMountainAC = (value: boolean) => {
    return {type: 'LOGIN/SET_IS_LOGGED_IN', value} as const
}
export type LoginMountainType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export const mountainLoginTC = (data: LoginMountainType): MountainThunk => async dispatch => {
    dispatch(setMountainStatus('loading'))
    try {
        let mountain = await mountainAuthAPI.login(data)
        if (mountain.data.resultCode === 0) {
            dispatch(setIsLoggetInOnMountainAC(true))
        }else {
            mountainServerErrorHandler(mountain.data, dispatch)
            dispatch(setMountainStatus('failed'))
        }
    } catch (e) {
        mountainNetworkHandler(e, dispatch)
    } finally {
        dispatch(setMountainStatus('succesed'))
    }
}
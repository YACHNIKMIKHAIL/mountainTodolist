import {Dispatch} from "redux";
import {RespType} from "../Api/mountainApi";
import {mountainAppReducerActionsType, setMountainError, setMountainStatus} from "../App/MountainAppReducer";

export const mountainServerErrorHandler = <R>(mountainData: RespType<R>, dispatch: Dispatch<mountainAppReducerActionsType>) => {
    if (mountainData.messages.length) {
        dispatch(setMountainError(mountainData.messages[0]))
    } else {
        dispatch(setMountainError('Some mountain troubles was happend !'))
    }
    dispatch(setMountainStatus('failed'))
}
export const mountainNetworkHandler = (e: any, dispatch: Dispatch<mountainAppReducerActionsType>) => {
    dispatch(setMountainError(e.message ? e.message : 'Some mountain troubles was happend !'))
    dispatch(setMountainStatus('failed'))
}
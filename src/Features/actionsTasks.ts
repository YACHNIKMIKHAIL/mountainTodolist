import {MountainTaskType, TaskPriorities, tasksApi, TaskStatuses} from "../Api/mountainApi";
import {MountainThunk, rootReducerType} from "../App/store";
import {setMountainStatus} from "../App/MountainAppReducer";

export enum Actions_Tasks_Types {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK = 'CHANGE_TASK',
    SET_TASKS = 'SET_TASKS'
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: Actions_Tasks_Types.REMOVE_TASK, todoId, taskId
} as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, item: MountainTaskType) => ({
    type: Actions_Tasks_Types.ADD_TASK, todoId, item
} as const)

export type changeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todoId: string, taskId: string, model:UpdateTaskModelType) => ({
    type: Actions_Tasks_Types.CHANGE_TASK, todoId, taskId, model
} as const)

export type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todoId: string, items: Array<MountainTaskType>,) => ({
    type: Actions_Tasks_Types.SET_TASKS, todoId, items
} as const)


export const setTaskThunk = (todoId: string): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    try {
        let res = await tasksApi.getTasks(todoId)
        dispatch(setTaskAC(todoId, res.data.items))
        dispatch(setMountainStatus('succesed'))
    } catch (e) {
        alert(e)
    }
}
export const addTaskThunk = (todoId: string, title: string): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    try {
        let res = await tasksApi.addTasks(todoId, title)
        dispatch(addTaskAC(todoId, res.data.data.item))
        dispatch(setMountainStatus('succesed'))
    } catch (e) {
        alert(e)
    }
}
export const deleteTaskThunk = (todoId: string, taskId: string): MountainThunk => async (dispatch) => {
    dispatch(setMountainStatus('loading'))
    try {
        await tasksApi.deleteTasks(todoId, taskId)
        dispatch(removeTaskAC(todoId, taskId))
        dispatch(setMountainStatus('succesed'))
    } catch (e) {
        alert(e)
    }
}

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskThunk = (todoId: string, taskId: string, domainModel:UpdateTaskModelType): MountainThunk => async (dispatch,getState:()=>rootReducerType) => {
    const state=getState()
    const task =state.tasks[todoId].filter(f=>f.id===taskId)[0]
    if(!task)  return

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }

    dispatch(setMountainStatus('loading'))
    try {
        await tasksApi.updateTasks(todoId, taskId, apiModel)
        dispatch(changeTaskAC(todoId, taskId, apiModel))
        dispatch(setMountainStatus('succesed'))
    } catch (e) {
        alert(e)
    }
}
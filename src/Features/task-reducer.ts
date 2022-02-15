import {TasksStateType} from "./Todolist/Todolist";
import {Actions_Todolists_Types, addTodolistACType, removeTodolistACType, setTodolistsACType} from "./actionsTodolists";
import {
    Actions_Tasks_Types,
    addTaskACType,
    changeTaskACType,
    loadTaskACType,
    removeTaskACType,
    setTaskACType
} from "./actionsTasks";

const initialTasks: TasksStateType = {}

export const tasksReducer = (state = initialTasks, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case Actions_Tasks_Types.REMOVE_TASK: {
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        }
        case Actions_Tasks_Types.ADD_TASK: {
            return {
                ...state,
                [action.todoId]: [{...action.item, taskStatus: 'idle'}, ...state[action.todoId]]
            }
        }
        case Actions_Tasks_Types.CHANGE_TASK: {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(m => m.id === action.taskId ? {...m, ...action.model} : m)
            }
        }
        case Actions_Todolists_Types.ADD_TODOLIST: {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        }
        case Actions_Todolists_Types.REMOVE_TODOLIST: {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        case Actions_Todolists_Types.SET_TODOLISTS: {
            const copyState = {...state}
            action.payload.data.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case Actions_Tasks_Types.SET_TASKS: {
            return {...state, [action.todoId]: action.items.map(m => ({...m, taskStatus: 'idle'}))}
        }
        case Actions_Tasks_Types.LOAD_TASK: {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(m => m.id === action.taskId ? {
                    ...m,
                    taskStatus: action.status
                } : m)
            }
        }
        default:
            return state
    }
}
export type TasksActionType =
    removeTaskACType
    | addTaskACType
    | changeTaskACType
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType
    | setTaskACType
    | loadTaskACType

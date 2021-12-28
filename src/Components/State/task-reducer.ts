import {TasksStateType} from "../Todolist";
import {task7} from "./task-reducer.test";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.todoId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoId]]
            }
        }
        case 'CHANGE_TASK': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(m => m.id === action.taskId ? {...m, title: action.title} : m)
            }
        }
        case 'ADD_TASKS_ARR': {
            return {
                ...state,
                [action.todoId]: []
            }
        }
        default:
            return state
    }
}
type ActionType = removeTaskACType | addTaskACType | chanheTaskACType | addNewTasksACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: 'REMOVE_TASK', todoId, taskId
} as const)
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, title: string) => ({
    type: 'ADD_TASK', todoId, title
} as const)
type chanheTaskACType = ReturnType<typeof chanheTaskAC>
export const chanheTaskAC = (todoId: string, taskId: string, title: string) => ({
    type: 'CHANGE_TASK', todoId, taskId, title
} as const)
type addNewTasksACType = ReturnType<typeof addNewTasksAC>
export const addNewTasksAC = (todoId: string) => ({
    type: 'ADD_TASKS_ARR', todoId
} as const)
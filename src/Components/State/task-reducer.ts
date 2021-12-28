import {TasksStateType} from "../Todolist";
import {task7} from "./task-reducer.test";
import {v1} from "uuid";
import {
    todolist1, todolist2,
    todolist3,
    todolist4,
    todolist5,
    todolist6,
    todolist7,
    todolist8,
    todolist9
} from "./todolists-reducer";

const initialTasks: TasksStateType = {
    [todolist1]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}],
    [todolist2]: [{id: v1(), title: "Book", isDone: false},
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Bread", isDone: false}],
    [todolist3]: [{id: v1(), title: "Helmet", isDone: true},
        {id: v1(), title: "Wheels", isDone: false},
        {id: v1(), title: "Crank", isDone: false}],
    [todolist4]: [{id: v1(), title: "Тудулист", isDone: true},
        {id: v1(), title: "Нативочка", isDone: false},
        {id: v1(), title: "Чилл)))", isDone: false}],
    [todolist5]: [{id: v1(), title: "Домой вернуться", isDone: true},
        {id: v1(), title: "Игровая комната", isDone: true},
        {id: v1(), title: "В гости к маме)", isDone: false}],
    [todolist6]: [{id: v1(), title: "Чай", isDone: true},
        {id: v1(), title: "Чай", isDone: true},
        {id: v1(), title: "Чай", isDone: false}],
    [todolist7]: [{id: v1(), title: "по обс-вам(", isDone: false},
        {id: v1(), title: "Выжить любой ценой", isDone: false},
        {id: v1(), title: "Попытаться кайфануть)", isDone: true}],
    [todolist8]: [{id: v1(), title: "Мульты", isDone: true},
        {id: v1(), title: "Сны", isDone: true},
        {id: v1(), title: "Ничё", isDone: false}],
    [todolist9]: [{id: v1(), title: "Цветы", isDone: false},
        {id: v1(), title: "Цветы", isDone: false},
        {id: v1(), title: "Цветы)", isDone: true}]
}

export const tasksReducer = (state = initialTasks, action: ActionType): TasksStateType => {
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
        case 'CHANGE_TASKS_STATUS': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(m => m.id === action.taskId ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case 'DELETE_TASKS_ALL': {
            let stateCopy = {...state}
            delete stateCopy[action.todoId]
            return stateCopy
        }
        default:
            return state
    }
}
type ActionType =
    removeTaskACType
    | addTaskACType
    | chanheTaskACType
    | addNewTasksACType
    | changeTaskSTATUSACType
    | deleteAllTasksACType
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
type changeTaskSTATUSACType = ReturnType<typeof changeTaskSTATUSAC>
export const changeTaskSTATUSAC = (todoId: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE_TASKS_STATUS', todoId, taskId, isDone
} as const)
type deleteAllTasksACType = ReturnType<typeof deleteAllTasksAC>
export const deleteAllTasksAC = (todoId: string) => ({
    type: 'DELETE_TASKS_ALL', todoId
} as const)
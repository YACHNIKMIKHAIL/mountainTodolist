import {TasksStateType} from "../Todolist";
import {Actions_Todolists_Types, addTodolistACType, removeTodolistACType, setTodolistsACType} from "./actionsTodolists";
import {
    Actions_Tasks_Types,
    addTaskACType,
    changeTaskACType,
    removeTaskACType,
    setTaskACType
} from "./actionsTasks";

const initialTasks: TasksStateType = {
    // [todolist1]: [{id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false}],
    // [todolist2]: [{id: v1(), title: "Book", isDone: false},
    //     {id: v1(), title: "Milk", isDone: false},
    //     {id: v1(), title: "Bread", isDone: false}],
    // [todolist3]: [{id: v1(), title: "Helmet", isDone: true},
    //     {id: v1(), title: "Wheels", isDone: false},
    //     {id: v1(), title: "Crank", isDone: false}],
    // [todolist4]: [{id: v1(), title: "Тудулист", isDone: true},
    //     {id: v1(), title: "Нативочка", isDone: false},
    //     {id: v1(), title: "Чилл)))", isDone: false}],
    // [todolist5]: [{id: v1(), title: "Домой вернуться", isDone: true},
    //     {id: v1(), title: "Игровая комната", isDone: true},
    //     {id: v1(), title: "В гости к маме)", isDone: false}],
    // [todolist6]: [{id: v1(), title: "Чай", isDone: true},
    //     {id: v1(), title: "Чай", isDone: true},
    //     {id: v1(), title: "Чай", isDone: false}],
    // [todolist7]: [{id: v1(), title: "по обс-вам(", isDone: false},
    //     {id: v1(), title: "Выжить любой ценой", isDone: false},
    //     {id: v1(), title: "Попытаться кайфануть)", isDone: true}],
    // [todolist8]: [{id: v1(), title: "Мульты", isDone: true},
    //     {id: v1(), title: "Сны", isDone: true},
    //     {id: v1(), title: "Ничё", isDone: false}],
    // [todolist9]: [{id: v1(), title: "Цветы", isDone: false},
    //     {id: v1(), title: "Цветы", isDone: false},
    //     {id: v1(), title: "Цветы)", isDone: true}]
}

export const tasksReducer = (state = initialTasks, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case Actions_Tasks_Types.REMOVE_TASK: {
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        }
        case Actions_Tasks_Types.ADD_TASK: {
            return {
                ...state,
                [action.todoId]: [action.item, ...state[action.todoId]]
            }
        }
        case Actions_Tasks_Types.CHANGE_TASK: {
            debugger
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(m => m.id === action.item.id ? {...action.item} : m)
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
            return {...state, [action.todoId]: [...action.items]}
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

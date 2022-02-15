import {TasksStateType} from "./Todolist";
import {v1} from "uuid";
import {tasksReducer} from "../task-reducer";
import {addTaskAC, changeTaskAC, loadTaskAC, removeTaskAC} from "../actionsTasks";
import {TaskPriorities} from "../../Api/mountainApi";

let startState = {} as TasksStateType;
let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string
let taskID: string
beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID3 = v1()
    todolistID4 = v1()
    taskID = v1()

    startState = {
        [todolistID1]: [{id: v1(), title: "HTML&CSS", status: 2, taskStatus: 'idle'},
            {id: '34', title: "JS", status: 2, taskStatus: 'idle'},
            {id: v1(), title: "ReactJS", status: 1, taskStatus: 'idle'}],
        [todolistID2]: [{id: v1(), title: "Book", status: 1, taskStatus: 'idle'},
            {id: v1(), title: "Milk", status: 1, taskStatus: 'idle'},
            {id: v1(), title: "Bread", status: 1, taskStatus: 'idle'}],
        [todolistID3]: [{id: v1(), title: "Helmet", status: 2, taskStatus: 'idle'},
            {id: taskID, title: "Wheels", status: 1, taskStatus: 'idle'},
            {id: v1(), title: "Crank", status: 1, taskStatus: 'idle'}],
        [todolistID4]: [{id: v1(), title: "Тудулист", status: 2, taskStatus: 'idle'},
            {id: v1(), title: "Нативочка", status: 1, taskStatus: 'idle'},
            {id: v1(), title: "Чилл)))", status: 1, taskStatus: 'idle'}],
    } as TasksStateType
})
test('correct task should be deleted', () => {
    let endState = tasksReducer(startState, removeTaskAC(todolistID1, '34'))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe("HTML&CSS")
    expect(endState[todolistID1][1].title).toBe("ReactJS")
})
test('correct task should be added', () => {
    let endState = tasksReducer(startState, addTaskAC(todolistID1, {
        id: v1(),
        title: "defde)))",
        status: 1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Hi,
        todoListId: todolistID1
    }))

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][0].title).toBe('defde)))')

})
test('correct task should be changed', () => {
    let endState = tasksReducer(startState, changeTaskAC(todolistID1, '34', {
        title: "defde)))",
        status: 1,
        deadline: '',
        description: '',
        startDate: '',
        priority: TaskPriorities.Hi
    }))

    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID1][1].title).toBe('defde)))')

})
test('correct task should be loaded', () => {
    let endState = tasksReducer(startState, loadTaskAC(todolistID1, '34', 'loading'))

    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID1][0].title).toBe("HTML&CSS")
    expect(endState[todolistID1][1].taskStatus).toBe("loading")
})
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TodolistsType} from "./Todolist/Todolist";
import {
    addTodolistAC,
    chandeTodolistFilterAC,
    changeTodolistTitleAC,
    loadTodolistsAC,
    removeTodolistAC
} from "./actionsTodolists";

let todolistID1: string
let todolistID2: string
let todolistID3: string
let todolistID4: string

let startState: TodolistsType[] = []

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolistID3 = v1()
    todolistID4 = v1()

    startState = [
        {id: todolistID1, title: 'What to learn?', filter: 'all',todolistStatus:'idle'},
        {id: todolistID2, title: 'What to buy?', filter: 'all',todolistStatus:'idle'},
        {id: todolistID3, title: 'What to fixie?', filter: 'all',todolistStatus:'idle'},
        {id: todolistID4, title: 'C чего начать?', filter: 'all',todolistStatus:'idle'}
    ] as TodolistsType[]
})

test('correct todolist should be removed', () => {
    let endState = todolistsReducer(startState,removeTodolistAC (todolistID1))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to buy?')
})
test('correct todolist should be added', () => {
    let endState = todolistsReducer(startState,addTodolistAC ({id: 'todolistID5', title: 'C ?', addedDate: '',
        order: 0
    }))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(5)
    expect(endState[0].title).toBe('C ?')
    expect(endState[0].id).toBe('todolistID5')
})
test('correct todolist filter be changed', () => {
    let endState = todolistsReducer(startState,chandeTodolistFilterAC (todolistID1,"complited"))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(4)
    expect(endState[0].filter).toBe('complited')
})
test('correct todolist title be changed', () => {
    let endState = todolistsReducer(startState,changeTodolistTitleAC (todolistID1,"bla"))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe('bla')
})
test('correct todolist should be load', () => {
    let endState = todolistsReducer(startState,loadTodolistsAC (todolistID1,"loading"))

    expect(startState.length).toBe(4)
    expect(endState.length).toBe(4)
    expect(endState[0].todolistStatus).toBe('loading')
})
import {v1} from 'uuid';
import {FilterType, TodolistsType} from "../Todolist";
import {todolistsReducer} from "./todolists-reducer";


export const todolist1 = v1()
export const todolist2 = v1()
export const todolist3 = v1()
export const todolist4 = v1()
export const todolist5 = v1()
export const todolist6 = v1()
export const todolist7 = v1()
export const todolist8 = v1()
export const todolist9 = v1()
test('correct todolist should be removed', () => {


    const startState: Array<TodolistsType> = [
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolist1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolist2);
});

test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsType> = [
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {


    let newFilter: FilterType = "complited";

    const startState: Array<TodolistsType> = [
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: v1(),
        newFilter
    };

    const endState = todolistsReducer(startState, {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolist2,
        filter: newFilter
    });

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
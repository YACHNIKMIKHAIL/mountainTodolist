import {v1} from 'uuid';
import {FilterType, TodolistsType} from "../Todolist";
import {chandeTodolistTitleAC, todolist1, todolist2, todolistsReducer} from "./todolists-reducer";



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

    const endState = todolistsReducer(startState, chandeTodolistTitleAC(todolist2, "New Todolist"))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("New Todolist");
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
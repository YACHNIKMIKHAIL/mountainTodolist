import {TodolistsType} from "../Todolist";
import {todolist1, todolist2, todolistsReducer} from "./todolists-reducer";
import {chandeTodolistTitleAC, removeTodolistAC} from "./actionsTodolists";


test('correct todolist should be removed', () => {


    const startState: Array<TodolistsType> = [
        // {id: todolist1, title: "What to learn", filter: "all"},
        // {id: todolist2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC( todolist1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolist2);
});

test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsType> = [
        // {id: todolist1, title: "What to learn", filter: "all"},
        // {id: todolist2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, chandeTodolistTitleAC(todolist2, "New Todolist"))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("New Todolist");
});


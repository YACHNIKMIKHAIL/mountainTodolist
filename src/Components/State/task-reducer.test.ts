import {v1} from 'uuid';
import {TasksStateType} from "../Todolist";
import {tasksReducer} from "./task-reducer";
import {todolist1, todolist2, todolist3} from "./todolists-reducer";
import {addTaskAC, changeTaskSTATUSAC, changeTaskAC, removeTaskAC} from "./actionsTasks";

export const task1 = v1()
export const task2 = v1()
export const task3 = v1()
export const task4 = v1()
export const task5 = v1()
export const task6 = v1()
export const task7 = v1()
export const task8 = v1()
export const task9 = v1()
test('correct todolist should be removed', () => {

    const startState: TasksStateType = {
        [todolist1]: [{id: task1, title: "HTML&CSS", isDone: true},
            {id: task2, title: "JS", isDone: true},
            {id: task3, title: "ReactJS", isDone: false}],
        [todolist2]: [{id: task4, title: "Book", isDone: false},
            {id: task5, title: "Milk", isDone: false},
            {id: task6, title: "Bread", isDone: false}],
        [todolist3]: [{id: task7, title: "Helmet", isDone: true},
            {id: task8, title: "Wheels", isDone: false},
            {id: task9, title: "Crank", isDone: false}],

    }

    const endState = tasksReducer(startState, removeTaskAC(todolist1,  task2))

    expect(endState[todolist1].length).toBe(2);
    expect(endState[todolist2].length).toBe(3);
    expect(endState[todolist1][1].title).toBe("ReactJS");
});

test('correct todolist should be added', () => {


    const startState: TasksStateType = {
        [todolist1]: [{id: task1, title: "HTML&CSS", isDone: true},
            {id: task2, title: "JS", isDone: true},
            {id: task3, title: "ReactJS", isDone: false}],
        [todolist2]: [{id: task4, title: "Book", isDone: false},
            {id: task5, title: "Milk", isDone: false},
            {id: task6, title: "Bread", isDone: false}],
        [todolist3]: [{id: task7, title: "Helmet", isDone: true},
            {id: task8, title: "Wheels", isDone: false},
            {id: task9, title: "Crank", isDone: false}],

    }

    const endState = tasksReducer(startState, addTaskAC( todolist2,  "New list"))

    expect(endState[todolist1].length).toBe(3);
    expect(endState[todolist2].length).toBe(4);
    expect(endState[todolist2][0].title).toBe("New list");
});

test('correct title of task should be changed', () => {


    const startState: TasksStateType = {
        [todolist1]: [{id: task1, title: "HTML&CSS", isDone: true},
            {id: task2, title: "JS", isDone: true},
            {id: task3, title: "ReactJS", isDone: false}],
        [todolist2]: [{id: task4, title: "Book", isDone: false},
            {id: task5, title: "Milk", isDone: false},
            {id: task6, title: "Bread", isDone: false}],
        [todolist3]: [{id: task7, title: "Helmet", isDone: true},
            {id: task8, title: "Wheels", isDone: false},
            {id: task9, title: "Crank", isDone: false}],

    }

    const endState = tasksReducer(startState, changeTaskAC(todolist2,task4,"New title"))

    expect(endState[todolist1].length).toBe(3);
    expect(endState[todolist2].length).toBe(3);
    expect(endState[todolist2][0].title).toBe("New title");
});


test('correct change task status', () => {


    const startState: TasksStateType = {
        [todolist1]: [{id: task1, title: "HTML&CSS", isDone: true},
            {id: task2, title: "JS", isDone: true},
            {id: task3, title: "ReactJS", isDone: false}],
        [todolist2]: [{id: task4, title: "Book", isDone: false},
            {id: task5, title: "Milk", isDone: false},
            {id: task6, title: "Bread", isDone: false}],
        [todolist3]: [{id: task7, title: "Helmet", isDone: true},
            {id: task8, title: "Wheels", isDone: false},
            {id: task9, title: "Crank", isDone: false}],

    }

    const endState = tasksReducer(startState, changeTaskSTATUSAC(todolist1,task3,true))

    expect(endState[todolist1].length).toBe(3);
    expect(endState[todolist1][2].isDone).toBe(true);

});
import React, {useState} from 'react';
import './App.css';
import {FilterType, TasksStateType, TaskType, Todolist, TodolistsType} from './Components/Todolist';
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import AirportShuttleSharpIcon from '@mui/icons-material/AirportShuttleSharp';
import {Container, Grid, IconButton, Paper} from "@mui/material";
import img1 from './Components/Image/wallpaperflare.com_wallpaper.jpg'
import {useDispatch, useSelector} from "react-redux";
import {
    addNewTasksAC,
    addTaskAC,
    changeTaskSTATUSAC, chanheTaskAC,
    deleteAllTasksAC,
    removeTaskAC
} from "./Components/State/task-reducer";
import {
    addTodolistAC,
    chandeTodolistFilterAC,
    chandeTodolistTitleAC,
    removeTodolistAC
} from "./Components/State/todolists-reducer";
import {rootReducerType} from "./Components/State/store";


function App() {
    // const todolist1 = v1()
    // const todolist2 = v1()
    // const todolist3 = v1()
    // const todolist4 = v1()
    // const todolist5 = v1()
    // const todolist6 = v1()
    // const todolist7 = v1()
    // const todolist8 = v1()
    // const todolist9 = v1()
    //
    //
    // const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolist1, title: 'What to learn?', filter: 'all'},
    //     {id: todolist2, title: 'What to buy?', filter: 'all'},
    //     {id: todolist3, title: 'What to fixie?', filter: 'all'},
    //     {id: todolist4, title: 'C чего начать?', filter: 'all'},
    //     {id: todolist5, title: 'Куда сходить?', filter: 'all'},
    //     {id: todolist6, title: 'Что пить?', filter: 'all'},
    //     {id: todolist7, title: 'Как жить теперь?', filter: 'all'},
    //     {id: todolist8, title: 'Что позырить?', filter: 'all'},
    //     {id: todolist9, title: 'Что подарить?', filter: 'all'}
    // ])
    // const [tasks, setTasks] = useState<TasksStateType>(
    //     {
    //         [todolist1]: [{id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false}],
    //         [todolist2]: [{id: v1(), title: "Book", isDone: false},
    //             {id: v1(), title: "Milk", isDone: false},
    //             {id: v1(), title: "Bread", isDone: false}],
    //         [todolist3]: [{id: v1(), title: "Helmet", isDone: true},
    //             {id: v1(), title: "Wheels", isDone: false},
    //             {id: v1(), title: "Crank", isDone: false}],
    //         [todolist4]: [{id: v1(), title: "Тудулист", isDone: true},
    //             {id: v1(), title: "Нативочка", isDone: false},
    //             {id: v1(), title: "Чилл)))", isDone: false}],
    //         [todolist5]: [{id: v1(), title: "Домой вернуться", isDone: true},
    //             {id: v1(), title: "Игровая комната", isDone: true},
    //             {id: v1(), title: "В гости к маме)", isDone: false}],
    //         [todolist6]: [{id: v1(), title: "Чай", isDone: true},
    //             {id: v1(), title: "Чай", isDone: true},
    //             {id: v1(), title: "Чай", isDone: false}],
    //         [todolist7]: [{id: v1(), title: "по обс-вам(", isDone: false},
    //             {id: v1(), title: "Выжить любой ценой", isDone: false},
    //             {id: v1(), title: "Попытаться кайфануть)", isDone: true}],
    //         [todolist8]: [{id: v1(), title: "Мульты", isDone: true},
    //             {id: v1(), title: "Сны", isDone: true},
    //             {id: v1(), title: "Ничё", isDone: false}],
    //         [todolist9]: [{id: v1(), title: "Цветы", isDone: false},
    //             {id: v1(), title: "Цветы", isDone: false},
    //             {id: v1(), title: "Цветы)", isDone: true}]
    //     }
    // )

    const dispatch = useDispatch()
    const tasks=useSelector<rootReducerType,TasksStateType>(state => state.tasks)
    const todolists=useSelector<rootReducerType,Array<TodolistsType>>(state => state.todolists)

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskSTATUSAC(todolistId, id, isDone))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(deleteAllTasksAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const newId = v1()
        dispatch(addTodolistAC(title, newId))
        dispatch(addNewTasksAC(newId))

    }

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatch(chanheTaskAC(todolistId, id, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(chandeTodolistTitleAC(todolistId, title))
    }


    return (
        <div style={{background: `url(${img1})no-repeat center/cover`, height: '100vh'}}>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <AirportShuttleSharpIcon/>
                        </IconButton>
                        <Typography variant='h6'>
                            Mountain todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={1} style={{height: '78vh', overflow: 'auto'}}>
                    {todolists.map(m => {
                        let tasksForTodo = tasks[m.id]
                        if (m.filter === 'active') {
                            tasksForTodo = tasks[m.id].filter(f => !f.isDone)
                        }
                        if (m.filter === 'complited') {
                            tasksForTodo = tasks[m.id].filter(f => f.isDone)
                        }
                        const changeFilter = (todolistId: string, filter: FilterType) => {
                            dispatch(chandeTodolistFilterAC(todolistId,filter))
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist key={m.id}
                                          todolistId={m.id}
                                          title={m.title}
                                          tasks={tasksForTodo}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={m.filter}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

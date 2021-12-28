import React from 'react';
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
    const dispatch = useDispatch()
    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)

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
                <AppBar position="static"
                        style={{backgroundColor:'rgba(130,33,149,0.4)'}}>
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
                            dispatch(chandeTodolistFilterAC(todolistId, filter))
                        }

                        return <Grid item>
                            <div style={{padding: '10px',borderRadius:'10px',backgroundColor:'rgba(139,228,250,0.8)'}}>
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
                            </div>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

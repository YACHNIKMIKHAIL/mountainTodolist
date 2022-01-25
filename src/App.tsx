import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist, TodolistsType} from './Components/Todolist';
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import AirportShuttleSharpIcon from '@mui/icons-material/AirportShuttleSharp';
import {Container, Grid, IconButton} from "@mui/material";
import img1 from './Components/Image/wallpaperflare.com_wallpaper.jpg'
import {useDispatch, useSelector} from "react-redux";
import {TodolistsActionType} from "./Components/State/todolists-reducer";
import {rootReducerType} from "./Components/State/store";
import {AddItemForm} from "./Components/AddItemForm";
import {Dispatch} from "redux";
import {TasksActionType} from "./Components/State/task-reducer";
import {addTodolistAC, addTodolistsThunk, setTodolistsThunk} from "./Components/State/actionsTodolists";
import {todolistApi} from "./Components/State/api";

const AppMemo = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        debugger
        dispatch(addTodolistsThunk(title))
        // todolistApi.postTodolist(title)
    }, [dispatch])

    useEffect(() => {
        debugger
        dispatch(setTodolistsThunk())
    }, )
    return (
        <div style={{background: `url(${img1})no-repeat center/cover`, height: '100vh'}}>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static"
                        style={{backgroundColor: 'rgba(130,33,149,0.1)'}}>
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
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
                    {todolists.map((m) => {

                        return <Grid item key={m.id}>
                            <div style={{
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(139,228,250,0.8)'
                            }}>
                                <Todolist todolistId={m.id}/>
                            </div>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export const App = React.memo(AppMemo);

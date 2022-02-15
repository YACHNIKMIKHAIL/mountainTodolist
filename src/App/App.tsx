import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodolistsType} from '../Features/Todolist/Todolist';
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import AirportShuttleSharpIcon from '@mui/icons-material/AirportShuttleSharp';
import {Container, Grid, IconButton, LinearProgress} from "@mui/material";
import img1 from '../Image/wallpaperflare.com_wallpaper.jpg'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store";
import {AddItemForm} from "../Components/AddItemForm";
import {addTodolistsThunk, getTodolistsThunk} from "../Features/actionsTodolists";
import TodolistList from "../Features/TodolistList";
import {mountainStatusTypes} from "./MountainAppReducer";
import MountainError from "../Components/MountainError";

const App = React.memo(() => {
        const dispatch = useDispatch()
        const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)
        const appStatus = useSelector<rootReducerType, mountainStatusTypes>(state => state.app.mountainStatus)

        const addTodolist = useCallback((title: string) => {
            dispatch(addTodolistsThunk(title))
        }, [dispatch])


        useEffect(() => {
            dispatch(getTodolistsThunk())
        }, [dispatch])
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
                    {appStatus === 'loading' && <LinearProgress color="inherit" style={{color: '#E26BE9'}}/>}
                </Box>

                <Container fixed>
                    <Grid container style={{padding: '10px'}}>
                        <AddItemForm callback={addTodolist}/>
                    </Grid>
                    <Grid container spacing={1} style={{height: '78vh', overflow: 'auto'}}>
                        {todolists.map((m, i) => {

                            return <Grid item key={m.id}>
                                <div style={{
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(139,228,250,0.8)',
                                    border: '3px whitesmoke solid'
                                }}
                                >
                                    <TodolistList todolist={m}
                                                  key={i}/>
                                </div>
                            </Grid>
                        })}
                    </Grid>
                </Container>
                <MountainError/>
            </div>
        );
    }
)
export default App;

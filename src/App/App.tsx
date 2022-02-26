import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import AirportShuttleSharpIcon from '@mui/icons-material/AirportShuttleSharp';
import {CircularProgress, IconButton, LinearProgress} from "@mui/material";
import img1 from '../Image/wallpaperflare.com_wallpaper.jpg'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store";
import {getTodolistsThunk} from "../Features/actionsTodolists";
import {initalizeMeTC, mountainStatusTypes} from "./MountainAppReducer";
import MountainError from "../Components/MountainError";
import {Login} from '../Features/Login/Login';
import MainMountain from "../Features/Todolist/todolists";
import {Navigate, Route, Routes} from 'react-router-dom';
import {mountainLogoutTC} from "../Features/Login/mountainAuthReducer";


const App = React.memo(() => {
        const appStatus = useSelector<rootReducerType, mountainStatusTypes>(state => state.app.mountainStatus)
        const dispatch = useDispatch()
        const isInitaializedInM = useSelector<rootReducerType, boolean>(state => state.app.isInitialized)
        const isLoggedInM = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
        const logoutHandler = () => {
            dispatch(mountainLogoutTC())
        }

        useEffect(() => {
            dispatch(initalizeMeTC())
        }, [])

        if (!isInitaializedInM) {
            return <div style={{
                background: `url(${img1})no-repeat center/cover`,
                height: '100vh',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress color="inherit" size={180} style={{color: 'white'}}/>
            </div>
        }
        return (
            <div style={{background: `url(${img1})no-repeat center/cover`, height: '100vh', overflow: 'auto'}}>

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
                            {isLoggedInM ? <Button color="inherit" onClick={logoutHandler}>Logout</Button> : <></>}

                        </Toolbar>
                    </AppBar>
                    {appStatus === 'loading' && <LinearProgress color="inherit" style={{color: '#E26BE9'}}/>}
                </Box>

                <Routes>
                    <Route path='/mountainTodolist' element={<MainMountain/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to='/404'/>}/>
                </Routes>
                <MountainError/>
            </div>
        );
    }
)
export default App;

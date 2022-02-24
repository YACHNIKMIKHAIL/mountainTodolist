import React, {useCallback} from 'react';
import TodolistList from "../TodolistList";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../App/store";
import {TodolistsType} from "./Todolist";
import {AddItemForm} from "../../Components/AddItemForm";
import {Container, Grid} from "@mui/material";
import {addTodolistsThunk} from "../actionsTodolists";
import { Navigate } from 'react-router-dom';

const MainMountain = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)
    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsThunk(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return (
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

    )
        ;
};

export default MainMountain;
import React from 'react';
import {Grid} from "@mui/material";
import TodolistList from "../TodolistList";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../App/store";
import {TodolistsType} from "./Todolist";

const Todolists = () => {
    const todolists = useSelector<rootReducerType, Array<TodolistsType>>(state => state.todolists)
    return (
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
    );
};

export default Todolists;
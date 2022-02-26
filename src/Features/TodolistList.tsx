import React, {useEffect} from 'react';
import Todolist, {TodolistsType} from "./Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../App/store";
import {Navigate, useNavigate} from "react-router-dom";
import {getTodolistsThunk} from "./actionsTodolists";

type TodolistListPropsType = {
    todolist: TodolistsType
}
const TodolistList = React.memo(({todolist}: TodolistListPropsType) => {
    // const dispatch = useDispatch()
    // const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()
    //
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         return
    //     }
    //     dispatch(getTodolistsThunk())
    // }, [])
    // if (!isLoggedIn) {
    //     debugger
    //     // return <Navigate to='/login'/>
    //     navigate('/login')
    // }
    return <Todolist todolist={todolist}/>
})

export default TodolistList;
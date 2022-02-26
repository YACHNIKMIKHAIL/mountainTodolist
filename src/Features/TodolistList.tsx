import React from 'react';
import Todolist, {TodolistsType} from "./Todolist/Todolist";

type TodolistListPropsType = {
    todolist: TodolistsType
}
const TodolistList = React.memo(({todolist}: TodolistListPropsType) => {
    return <Todolist todolist={todolist}/>
})

export default TodolistList;
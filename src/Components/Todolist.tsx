import React, {ChangeEvent, useState} from 'react';

export type FilterType = 'all' | 'complited' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeFilter = (filter: FilterType) => {
        props.changeFilter(filter)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map(m => {
                const removeTask = () => {
                    props.removeTask(m.id)
                }
                return <li>
                    <input type="checkbox" checked={m.isDone}/>
                    <span>{m.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('complited')}>Completed</button>
        </div>
    </div>
}

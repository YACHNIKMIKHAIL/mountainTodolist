import React, {ChangeEvent, useCallback, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import AttachFileIcon from '@mui/icons-material/AttachFile';

type AddItemFormPropsType = {
    callback: (title: string) => void
}
const AddItemFormMemo = ({callback}: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = useCallback(() => {
        if (title.trim() !== '') {
            callback(title.trim())
            setError(false)
            setTitle('')
        } else {
            setError(true)
        }
    },[callback,title])

    const onKeyPressHandler =useCallback ((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    },[addTask])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    },[])

    return (
        <div>
            <TextField id="outlined-basic" label="New task" variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       helperText={error}/>
            <Button variant="contained" onClick={addTask}
                    style={{height: '55px',backgroundColor:'rgba(109,4,234,0.37)',color:'white'}}>
               <AttachFileIcon/>
            </Button>
            {error ? <div className={'error-message'}>Title is required !</div> : ''}
        </div>
    );
};

export const AddItemForm = React.memo(AddItemFormMemo);
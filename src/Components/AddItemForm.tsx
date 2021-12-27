import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType={
    callback:(title:string)=>void
}
const AddItemForm = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
            setError(false)
            setTitle('')
        } else {
            setError(true)
        }

    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error ? <div className={'error-message'}>Title is required !</div> : ''}
        </div>
    );
};

export default AddItemForm;
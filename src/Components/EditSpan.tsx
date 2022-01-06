import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    callback: (title: string) => void
}
const EditSpanMemo = (props: EditSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const activate = () => {
        setEdit(true)
        setTitle(props.title)
    }
    const desactivate = () => {
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return edit
        ? <TextField id="standard-basic" label={title} variant="standard"
                     onChange={onChangeHandler} autoFocus onBlur={desactivate}/>
        // <input value={title} onChange={onChangeHandler} autoFocus onBlur={desactivate}/>
        : <span onDoubleClick={activate}>{props.title}</span>

};

export const EditSpan = React.memo(EditSpanMemo);
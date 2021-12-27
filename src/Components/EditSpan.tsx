import React, {ChangeEvent, useState} from 'react';

type EditSpanPropsType = {
    title: string
    callback:(title:string)=>void
}
const EditSpan = (props: EditSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const activate=()=>{
        setEdit(true)
        setTitle(props.title)
    }
    const desactivate=()=>{
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return edit
        ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={desactivate}/>
        : <span onDoubleClick={activate}>{props.title}</span>

};

export default EditSpan;
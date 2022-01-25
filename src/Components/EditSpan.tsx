import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    callback: (title: string) => void
}
const EditSpan = React.memo(({title, callback}: EditSpanPropsType) => {

        const [edit, setEdit] = useState<boolean>(false)
        const [stateTitle, setStateTitle] = useState<string>('')
        const activate = useCallback(() => {
            setEdit(true)
            setStateTitle(title)
        }, [title, setStateTitle])
        const desactivate = useCallback(() => {
            setEdit(false)
            callback(stateTitle)
        }, [callback, stateTitle])
        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setStateTitle(e.currentTarget.value)
        }, [])

        return edit
            ? <TextField id="standard-basic" label={stateTitle} variant="standard"
                         onChange={onChangeHandler} autoFocus onBlur={desactivate}/>
            : <span onDoubleClick={activate}>{title}</span>

    }
)

export default EditSpan
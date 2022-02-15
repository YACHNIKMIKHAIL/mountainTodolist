import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {setMountainError} from "../App/MountainAppReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../App/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MountainError() {
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setMountainError(null))
    };
    const mountainError = useSelector<rootReducerType, string | null>(state => state.app.mountainError)
    return (

        <Snackbar open={mountainError !== null} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {mountainError}
            </Alert>
        </Snackbar>

    );
}

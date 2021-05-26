import React, { useState } from 'react'
import axios from 'axios'
import { clientKeys } from '../../../client-config/clientKeys'
import { useStyles } from './styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


function Login() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        axios({
            method: "POST",
            data: {
                username: email,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:3030/login",
        }).then((res) => console.log(res));
    }

    const handleLogout = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3030/logout",
        }).then((res) => console.log(res));
    }

    const handleChangeEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }



    return (
        <div className={classes.root}>
            <form className={classes.form} action="">
                <TextField className={classes.input} label="Email" variant="outlined" onChange={handleChangeEmail} />
                <TextField className={classes.input} label="Password" variant="outlined" onChange={handleChangePassword} />
                <Button className={classes.button} onClick={handleClick}>Login</Button>
            </form>
            <Button className={classes.button} type="submit" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Login

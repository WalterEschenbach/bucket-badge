import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { clientKeys } from '../../../client-config/clientKeys'
import { useStyles } from './styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'



function Login() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        console.log('Client Login Submit Render')
        axios({
            method: "POST",
            data: {
                username,
                password,
            },
            withCredentials: true,
            url: `${clientKeys.domain.server}/login`,
        }).then((res) => {
            console.log('login res', res)
        }).then(() => history.push('/dashboard'))
            .catch((err) => console.log(err))
    }

    const handleLogout = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${clientKeys.domain.server}/logout`,
        }).then((res) => console.log(res));
    }
    const handlePing = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${clientKeys.domain.server}/ping`,
        }).then((res) => console.log(res));
    }

    const handleChangeUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }



    return (
        <div className={classes.root}>
            <form className={classes.form} action="">
                <TextField className={classes.input} label="Username" variant="outlined" onChange={handleChangeUsername} />
                <TextField className={classes.input} label="Password" variant="outlined" onChange={handleChangePassword} />
                <Button className={classes.button} onClick={handleClick}>Login</Button>
            </form>
            <Button className={classes.button} onClick={handleLogout}>Logout</Button>
            <Button className={classes.button} onClick={handlePing}>Ping</Button>
        </div>
    )
}

export default Login

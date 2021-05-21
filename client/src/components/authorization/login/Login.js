import React, { useState } from 'react'
import axios from 'axios'
import { clientKeys } from '../../../client-config/clientKeys'
import { useStyles } from './styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


function Login() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        const transport = axios.create({ withCredentials: true })
        const tLink = `${clientKeys.domain.server}/login`
        const userInfo = {
            username,
            password
        }

        transport.post(tLink, userInfo)
            .then((req, res) => {
                console.log('user submitted')
            })
            .catch(error => console.log("client Error:", error))

    }

    const handleLogout = () => {
        const transport = axios.create({ withCredentials: true })
        const tLink = `${clientKeys.domain.server}/logout`

        transport.get(tLink)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleChangeUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
        console.log("username:", username)
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
                <Button className={classes.button} type="submit" onClick={handleClick}>Login</Button>
            </form>
            <Button className={classes.button} type="submit" onClick={handleLogout}>Logout</Button>

        </div>
    )
}

export default Login

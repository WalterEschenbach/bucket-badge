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

    const handleClick = (e) => {
        e.preventDefault()
        const transport = axios.create({ withCredentials: true })
        const tLink = `${clientKeys.domain.server}/login`
        const userInfo = {
            email,
            password
        }

        transport.post(tLink, userInfo)
            .then((res) => {
                console.log('user sent to client', res)
            })
            .catch(error => console.log("client Error:", error))

    }

    const handlePing = (e) => {
        e.preventDefault()
        const transport = axios.create({ withCredentials: true })
        const tLink = `${clientKeys.domain.server}/`

        transport.get(tLink)
            .then((res) => {
                console.log('user sent to client', res)
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
                <Button className={classes.button} type="submit" onClick={handleClick}>Login</Button>
            </form>
            <Button className={classes.button} type="submit" onClick={handleLogout}>Logout</Button>
            <Button className={classes.button} type="submit" onClick={handlePing}>Ping</Button>

        </div>
    )
}

export default Login

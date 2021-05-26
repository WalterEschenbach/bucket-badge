import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { clientKeys } from '../../../client-config/clientKeys'
import { useStyles } from './styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


function Register() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        const transport = axios.create({ withCredentials: true })
        const tLink = `${clientKeys.domain.server}/register`
        const userInfo = {
            username,
            password
        }

        transport.post(tLink, userInfo)
            .then((res) => {
                console.log('Response:', res)
                if(res) {history.push('/login')} 
            })
            .catch(error => console.log("client Error:", error))

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
                <Button className={classes.button} type="submit" onClick={handleClick}>Register</Button>
            </form>
        </div>
    )
}

export default Register

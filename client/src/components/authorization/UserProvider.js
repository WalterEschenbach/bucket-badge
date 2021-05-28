import React, { createContext, useState, useEffect } from 'react'
import { clientKeys } from '../../client-config/clientKeys'
import axios from 'axios'

const context = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${clientKeys.domain.server}/user`,
            withCredentials: true
        })
            .then(res => {
                console.log('res:', res)
                setUser(res)
            })
            .catch(err => {
                setUser(false)
                console.log(err)
            })
    }, [])

    return (
        <context.Provider value={user}>
            {children}
        </context.Provider>
    )
}

UserProvider.context = context;


export default UserProvider
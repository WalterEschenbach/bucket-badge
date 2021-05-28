import React, { useEffect, useState, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserProvider from '../UserProvider'
import { Spinner } from 'react-bootstrap'

export default function PrivateRoute({ comp: Component, ...rest }) {
    const [authStatus, setAuthStatus] = useState(null)

    const data = useContext(UserProvider.context)


    useEffect(() => {
        console.log('DATA', data)
        if (data) setAuthStatus(true)
        else if (data === null) setAuthStatus(false)
    }, [data])

    return (
        <Route {...rest} render={(props) => {
            switch (authStatus) {
                case null: {
                    return <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }} />
                }
                case true: {
                    return <Component {...props} />;
                }
                case false: {
                    return <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }} />
                }
                default: {
                    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%", height: "100vh" }}><Spinner animation="border" variant="secondary" style={{ width: "5em", height: "5em" }} /></div>
                }
            }
        }}
        />
    )
}
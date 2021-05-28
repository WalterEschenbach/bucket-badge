import React from 'react'
import { useStyles } from './styles'

function Dashboard() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            Dashboard
        </div>
    )
}

export default Dashboard
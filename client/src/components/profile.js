import React from 'react'

const profile = (props) => {
    return (
        <div className="container">
            <h1>Este es el perfil de {props.loggedInUser.username}</h1>
        </div>
    )
}

export default profile
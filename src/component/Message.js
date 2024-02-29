import React from 'react'
import "./message.css"

const Message = ({ user, message, classs }) => {
    return (
        <div className={`messageBox ${classs}`}>
            {`${user}: ${message}`}
        </div>
    )
}

export default Message
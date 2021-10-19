import React from 'react'
import './ChatSent.css';

const ChatSent = ({ message, time }) => {
    return (
        <p className="chat__body__receiver">
            <span className="chat__body__content">{message}</span>
            <span className="chat__timestamp">
                {time}
            </span>
            <span className="left__triangle"/>
        </p>
    )
}

export default ChatSent

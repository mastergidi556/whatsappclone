import React, { useContext } from 'react'
import './Land.css'
import UserContext from '../../ContextAPI/User/UserContext'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Land = () => {
    const User = useContext(UserContext)
    const { displayName, avatar, appPhoneNumber } = User

    const showChat = () => {
        const side = document.querySelector('.sidebar')
        const land = document.querySelector('.land')
        // const chat = document.querySelector('.chat')
        // chat.style.display = "none"
        land.style.display = "none"
        side.style.display = "flex"
        side.style.flex = 1
    }

    const openNewConvo = () => {
        const newConvo = document.querySelector('.sidebar__newConvo')
        newConvo.style.display = "flex"
    }

    const homeConvo = () => {
        showChat();
        openNewConvo()
    }

    return (
        <div className="land">
        {
            window.innerWidth < 715
            ?
            <IconButton onClick={showChat}>
                <MenuRoundedIcon/>
            </IconButton>
            :
            ''
        }
            <div className={`land__comp ${window.innerHeight > 568 ? 'land__more__comp' : ''}`}>
                <div className="login__text">
                    <h1>Welcome, <br/> {displayName}</h1>
                    <h3>Your phone number is {appPhoneNumber}</h3>
                </div>
                <div className={`login__image ${window.innerHeight < 580 ? 'land__more__comp' : ''}`}>
                    <img src={avatar} alt=''/>
                </div>
                <div className="login__story">
                    <div className="chat__start">
                        <h3>Start a new chat</h3> 
                        <ArrowForwardRoundedIcon/>
                    </div>
                    <div className="chat__icon">
                        <ChatIcon onClick={homeConvo}/>
                    </div>
                </div>
                <div className="login__more__story">
                    <p>You can start a chat with Daniel(the developer, lol) to get started using 08018443311.</p>
                </div>
                <h4 className="chat__icon__also">You can also start a new chat by clicking <ChatIcon/> at the top of the sidebar menu.</h4>
            </div>
        </div>
    )
}



export default Land

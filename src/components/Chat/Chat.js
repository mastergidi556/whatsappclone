import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React, { useEffect, useState, useContext } from 'react'
import './Chat.css'
import ChatReceived from './ChatReceived/ChatReceived';
import ChatSent from './ChatSent/ChatSent';
import axios from '../../axios'
import back from './wallpaper.PNG'
import { withRouter } from 'react-router-dom';
import UserContext from '../../ContextAPI/User/UserContext'
import PushContext from '../../ContextAPI/Push/PushContext'
import Pusher from 'pusher-js'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


const pusher = new Pusher('32f57dadcb8ff9637c3c', {
    cluster: 'eu'
});

const Chat = ({ match, parentCallBack, forRoute }) => {
    const User = useContext(UserContext)
    const [msg, sendMsg] = useState('')
    // const [message, sendMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [chatInfo, setChatInfo] = useState('')
    const [chat_Id, setChat_Id] = useState('')
    const [reactPusher, setReactPusher] = useState(1)
    const [forSideChat, setForSideChat] = useState(1)
    const sendPush = () => {
        parentCallBack(forSideChat)
    }
    
    // const pusher = new Pusher('32f57dadcb8ff9637c3c', {
    //     cluster: 'eu'
    // });

    useEffect(() => {
        const channel = pusher.subscribe('chats');
        channel.bind('updated', (newMessage) => {
            setReactPusher(Date.now())
        })   
        return () => {
            channel.unbind();
            pusher.unsubscribe()
        }
    }, [])
    

    // useEffect(() => {
    //     const side = document.querySelector('.sidebar')
    //     const chat = document.querySelector('.chat')
    //     chat.style.display = "flex"
    //     side.style.display = "none"
    
    // }, [match.params.chatId])
    
    useEffect(() => {
        const chatBody = document.querySelector('.chat__body');
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;            
        }, 200);
    }, [allMessages])
    
    useEffect(() => {
        axios.post(`/contacts/contactId/${match.params.chatId}`, {
            ath: match.params.chatId
        })
        .then(response => {
            const chat = response.data
            setChat_Id(chat._id)
            const chatMessage = chat.messages
            setAllMessages(chatMessage)

            const chatDetails = chat.authors
            if (chatDetails[0]._id === User._id) {
                setChatInfo(chatDetails[1])
            } else if (chatDetails[0]._id !== User._id) {
                setChatInfo(chatDetails[0])
            }
        })
        if (window.innerWidth < 712) {
            const side = document.querySelector('.sidebar')
            const chat = document.querySelector('.chat')
            chat.style.display = "flex"
            side.style.display = "none"      
        }
        else if (window.innerWidth > 712) {
            return
        }
    }, [ match.params.chatId, forRoute])
    
    useEffect(() => {
        axios.post(`/contacts/contactId/${match.params.chatId}`, {
            ath: match.params.chatId
        })
        .then(response => {
            const chat = response.data
            setChat_Id(chat._id)
            const chatMessage = chat.messages
            setAllMessages(chatMessage)
        })
    }, [reactPusher])


    const sendMessage = async (event) => {
        event.preventDefault();

        if (!msg) return
        await axios.put(`/chat/id/${chat_Id}`, {
            message: msg,
            sender: User._id,
            id: chat_Id,
            timestamp: (new Date()).toString().slice(16, 21),
        })
        setForSideChat(forSideChat+1)
        sendMsg('')
    }

    useEffect(() => {
        sendPush()
    }, [forSideChat])

    const showChat = () => {
        const side = document.querySelector('.sidebar')
        const chat = document.querySelector('.chat')
        chat.style.display = "none"
        side.style.display = "flex"
        side.style.flex = 1
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <ArrowBackRoundedIcon onClick={showChat} className="chat__header__arrowBack"/>
                <Avatar src={chatInfo.avatar}/>
                <div className="chat__headerInfo">
                    <h3>{chatInfo.displayName}</h3>
                    <p>{chatInfo.appPhoneNumber}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreHorizIcon/>
                    </IconButton>
                </div>
            </div>
            <div style={{backgroundImage: `url(${back})`}} className="chat__body">
                {
                    allMessages.map(({ _id, message, timestamp, sentBy}) => {
                        if (sentBy !== User._id) {
                            return <ChatReceived key={_id} name={sentBy} message={message} time={timestamp} />
                        } else {
                            return <ChatSent key={_id} name={sentBy} message={message} time={timestamp} />
                        }
                    })
                }
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form
                    onSubmit={sendMessage}
                >
                    <input
                        value={msg}
                        onChange={(e) => sendMsg(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                </form>
                <IconButton onClick={sendMessage}>
                    <SendRoundedIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default withRouter(Chat)

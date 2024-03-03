import React, { useEffect, useState } from 'react'
import { user } from './Join'
import socketIO from "socket.io-client";
import "./chat.css";
import Message from './Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../Images/closeIcon.png";


let socket;
const Chat = () => {
    let EndPoint = 'https://instant-chat-app.onrender.com/';

    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        const roomInputId = document.getElementById('roomInput').value;
        socket.emit('message', { message, id, roomInputId});
        document.getElementById('chatInput').value = "";
    };

    useEffect(() => {
        socket = socketIO(EndPoint, { transports: ['websocket'] });
        socket.on('connect', () => {
            setId(socket.id);
        })

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, data.message);
        })

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })
        return () => {
            socket.off();
        }
    }, []);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Instant Chat Id: {id}</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? 'You' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="roomInput" placeholder='Room Id' />
                    <input onKeyUp={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" placeholder='Message'/>
                    <button onClick={send} id='sendBtn'> <p>Send</p></button>
                </div>
            </div>
        </div>
    )
};

export default Chat
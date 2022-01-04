import React, {ChangeEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

type UsersType = {
    userId: number
    userName: string
    message: string
    photo:string
}

function App() {
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState<Array<UsersType>>([])
    const [webSocked, setWebSocked] = useState<null | WebSocket>(null)

    useEffect(() => {
        const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.onmessage = (messageEvent) => {
            setUsers([...users, ...JSON.parse(messageEvent.data)])
        }
        setWebSocked(ws);

    }, [])
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const sendMessage = () => {
        if (webSocked) {
            webSocked.send(message)
        }

    }
    return (
        <div className="App">

            <div className={'chat'}>
                <div className={'messages'}>
                    {users.map((m, index) =>
                        <div className={'message'} key={index}>
                            <img src={m.photo} alt="avatar"/>
                            <b>{m.userName}</b>
                            <span>{m.message}</span>
                        </div>
                    )}

                </div>

                <div className={'footer'}>
                    <textarea value={message} onChange={onMessageChange}></textarea>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>

        </div>
    );
}

export default App;

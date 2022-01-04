import React, {ChangeEvent, LegacyRef, RefObject, useEffect, useRef, useState} from 'react';
import './App.css';

type UsersType = {
    userId: number
    userName: string
    message: string
    photo: string
}

function App() {
    const messagesBlockRef = useRef()
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState<Array<UsersType>>([])
    const [webSocked, setWebSocked] = useState<null | WebSocket>(null)

    if (webSocked) {
        webSocked.onmessage = (messageEvent) => {
            setUsers([...users, ...JSON.parse(messageEvent.data)])
        }
    }

    useEffect(() => {
        const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        setWebSocked(ws);
    }, [])
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const sendMessage = () => {
        if (webSocked) {
            webSocked.send(message)
            setMessage('')
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
                    <textarea value={message} onChange={onMessageChange}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>

        </div>
    );
}

export default App;

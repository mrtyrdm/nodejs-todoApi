import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const Homee: React.FC = () => {


    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [count, setCounter] = useState(1);
    const [test , setTest] = useState('');
    const [response, setResponse] = useState("");

    useEffect(() => {
        socket.on("count", (data) => {
            setResponse(data);
            console.log(data);
        });

    }, [socket]);

    const increment = (): any => {
        setCounter(count+1);
        socket.emit('join',test, count);
    };

    const handleInput = (e) : any => {
        let value = e.target.value;
        setTest(value);
    };

    return (
        <>
            <div className="d-flex mt-2 p-4">
                <input type="text" className="w-100" placeholder="room" onChange={handleInput}/>
            </div>
            <div className="d-flex flex-column min-vh-100">
                <p>Connected: { '' + isConnected }</p>
                <p>Last pong: { response || '-' }</p>
                <p>{test}</p>
                <button onClick={ increment }>Send ping</button>
            </div>
        </>
    );
};

export default Homee;

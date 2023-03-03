import React, {useEffect, useRef} from 'react';
import './App.css';

import APIClient from "./APIClient";
import {connect} from "./RSocket";

function App() {

    const [message, setMessage] = React.useState()
    const client: React.MutableRefObject<APIClient> = useRef(new APIClient());

    async function init(): Promise<void> {
        client.current = await connect()
            .then((rsocket) => new APIClient(rsocket))
        console.log(client.current)
    }

    useEffect(() => {
        init()
    }, []);
    // run();
    function readMessage() {
        const apiClient = client.current;
        apiClient.getMessage(setMessage).finally()
    }

    // readMessage()

    return (
        <div>
            kek
            <br/>
            <button onClick={readMessage}>button</button>
            <br/>
            {message}
        </div>
    );
}

export default App;

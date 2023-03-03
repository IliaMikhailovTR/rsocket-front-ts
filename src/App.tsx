import React, {useEffect, useRef} from 'react';
import './App.css';
// @ts-ignore
import Flowable from 'rsocket-flowable';

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

    function readMessage() {
        const apiClient = client.current;
        const flowable = new Flowable(apiClient.getMessage(setMessage))
        flowable.subscribe()
        // apiClient.getMessage(setMessage).finally()
    }

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

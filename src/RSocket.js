import RSocketWebSocketClient from "rsocket-websocket-client";
import {
    BufferEncoders,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    RSocketClient
} from "rsocket-core";


export async function connect(responder) {
    console.log("connecting");
    const socketClient = new RSocketClient({
        setup: {
            keepAlive: 30000,
            lifetime: 90000,
            dataMimeType: 'application/octet-stream',
            metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        },
        responder: responder,
        transport: new RSocketWebSocketClient({url : "ws://localhost:8083"}, BufferEncoders),
    });
    return await socketClient.connect();
}

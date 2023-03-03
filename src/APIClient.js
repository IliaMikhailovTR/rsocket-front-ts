import {
    encodeCompositeMetadata,
    encodeRoute,
    MESSAGE_RSOCKET_ROUTING
} from "rsocket-core";
import {flatbuffers} from "flatbuffers";


export default class APIClient {
    constructor(rsocket) {
        this.rsocket = rsocket;
    }

    getMessage(setMessage) {
        return this.rsocket.requestStream({
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute('user')],
            ]),
        }).subscribe({
            onSubscribe(s) {
                console.log("subscribed")
                s.request(2147483642)
            },
            onNext(eventBuf) {
                const dataBuf = flatbuffers.ByteBuffer.allocate(eventBuf.data);
                let string = new TextDecoder().decode(dataBuf.bytes());
                console.log(string)
                setMessage(string)
            },
            onError(err) {
                // reject(err)
            },
            onComplete() {
                console.log("that's it")
                // resolve()
            }
        });
    }
}

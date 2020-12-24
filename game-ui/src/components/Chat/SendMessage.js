import React from "react";

export default function SendMessage(props) {

    const username = props.username;
    const room = props.room;
    const roomId = room.id;
    const stompClient = props.stompClient;
    const [typedMessage, setTypedMessage] = React.useState("");


    const handleSendMessage = (event) => {
        event.preventDefault();
        const msgToSend = {
            username: username,
            message: typedMessage
        }
        console.log("Before sending message..." + JSON.stringify(msgToSend));
        stompClient.send('/app/room/' + roomId + "/chat", {}, JSON.stringify(msgToSend));
        setTypedMessage("");
    };

    return (
        <div className="">
            <form>
                <div className="input-group">
                    <input type="text" className="form-control"
                           onChange={(e) => setTypedMessage(e.target.value)}
                           value={typedMessage}/>
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <button type="submit" className="btn border-0 p-0"
                                    onClick={handleSendMessage}>
                                <i className="fas fa-paper-plane"/>
                                </button>
                        </span>
                    </div>
                    <div className="input-group">
                        <select className="custom-select" id="preparedChat">
                            <option value="1">Nước đó rất cao!</option>
                            <option value="2">Làm ván nữa nhé!</option>
                            <option value="3">Các hạ quá khen!</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}
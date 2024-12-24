import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log('create room', socket);
        socket.emit('create-room', 'roomName');
    }
    return (
        <div>
            <h1>Create Room</h1>
            <button onClick={initRoom} className="btn btn-secondary">Start a new meeting in a room</button>
        </div>
    )
}

export default CreateRoom;
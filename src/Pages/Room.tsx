import { useParams } from "react-router-dom"
import { SocketContext } from "../Context/SocketContext";
import { useContext, useEffect } from "react";

const Room: React.FC = () => {
    const {id} =  useParams();
    const {socket, user} = useContext(SocketContext);

    useEffect(() => {
        if(user) {
            socket.emit('joined-room', {roomId: id, peerId: user._id});
        }
    }, [id, user, socket]);

  return (
    <div>
        <h1> Room : {id} </h1>
    </div>
  )
}

export default Room
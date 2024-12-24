import { useParams } from "react-router-dom"
import { SocketContext } from "../Context/SocketContext";
import { useContext, useEffect } from "react";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {
    const {id} =  useParams();
    const {socket, user, stream, peers} = useContext(SocketContext);

    useEffect(() => {
        if(user) {
            socket.emit('joined-room', {roomId: id, peerId: user._id});
        }
    }, [id, user, socket]);

  return (
    <div className="flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-4">Room: {id}</h1>
            <h2 className="text-xl font-semibold mb-2">Your own user Feed</h2>
            <UserFeedPlayer stream={stream} />
            <div className="w-full mt-5">
                <h2 className="text-xl font-semibold mb-2 text-center">Others' user feed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.keys(peers).map((peerId) => (
                        <UserFeedPlayer key={peerId} stream={peers[peerId]?.stream} />
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Room
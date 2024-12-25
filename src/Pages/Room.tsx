import { useParams } from "react-router-dom"
import { SocketContext } from "../Context/SocketContext";
import { useContext, useEffect, useState } from "react";
import UserFeedPlayer from "../Components/UserFeedPlayer";
import { addPeerAction, removePeerAction } from "../Actions/peerAction";

const Room: React.FC = () => {
    const {id} =  useParams();
    const {socket, user, stream, peers, dispatch} = useContext(SocketContext);

    useEffect(() => {
        if (user) {
            socket.emit('joined-room', { roomId: id, peerId: user._id });
        }
    }, [id, user, socket]);

    useEffect(() => {
      socket.on('user-left', ({ peerId }: { peerId: string }) => {
          dispatch(removePeerAction(peerId));
      });

      socket.on('user-joined', ({ peerId }: { peerId: string }) => {
          const call = user.call(peerId, stream);
          call.on('stream', (remoteStream: MediaStream) => {
              dispatch(addPeerAction(peerId, remoteStream));
          });
      });

      return () => {
          socket.off('user-left');
          socket.off('user-joined');
      };
  }, [socket, user, stream, dispatch]);
  return (
    <div className="flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-4">Room id: {id}</h1>
            <h2 className="text-xl font-semibold mb-2">Your own Feed</h2>
            <UserFeedPlayer stream={stream} />
            <div className="w-full mt-3">
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
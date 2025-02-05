import SocketIoClient from 'socket.io-client';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import {v4 as UUIDv4} from 'uuid';  
import { peerReducer } from '../Reducers/peerReducer';
import { addPeerAction, removePeerAction } from '../Actions/peerAction';

const WS_Server = 'http://localhost:5500';

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server, {
    withCredentials: false,
    transports: ["polling", "websocket"],
});

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();

     const [peers, dispatch] = useReducer(peerReducer, {});

    const fetchParticipants = ({roomId, participants}: {roomId: string, participants: string[]}) => {
        console.log('participants', participants);
    }

    const fetchUserFeed = async() => {
       const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
         setStream(stream);
    }

    useEffect(() => {

        const userId = UUIDv4();
        const newPeer = new Peer(userId, {
            host: 'localhost',
            port: 9000,
            path: '/myapp',
        });

        setUser(newPeer);
        fetchUserFeed();

      const enterRoom = ({roomId}: {roomId: string}) => {
        navigate(`/room/${roomId}`);
      }

      socket.on('room-created', enterRoom);

      socket.on('get-users', fetchParticipants);
    }, []);

    useEffect(() => {
        if(!user || !stream) return;    

        socket.on('user-joined', ({peerId}: {peerId: string}) => {
            const call = user.call(peerId, stream);
            call.on('stream', () => {
                dispatch(addPeerAction(peerId, stream));
            })
        });

        user.on('call', (call) => {
            call.answer(stream);
            call.on('stream', () => {
                dispatch(addPeerAction(call.peer, stream));
            })
        });

        socket.on('user-left', ({ peerId }: { peerId: string }) => {
            dispatch(removePeerAction(peerId));
        });

        socket.emit("ready");

        return () => {
            socket.off('user-joined');
            socket.off('user-left');
            user.off('call');
        };

    },[user, stream]);

    return (
        <SocketContext.Provider value={{socket, user, setStream, stream, peers, dispatch}}>
            {children}
        </SocketContext.Provider>
    );
}
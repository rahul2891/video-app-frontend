import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log('create room', socket);
        socket.emit('create-room', 'roomName');
    }

    return (
        <div className="flex flex-col items-center p-5 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                <h1 className="text-teal-600 text-3xl font-bold mb-4 text-center">About this app</h1>
                <p className="mb-4 text-gray-700">
                This is a group video app where multiple people can join a video call. A room is created where all users can join. When a user leaves the room, they will be disconnected from the call.
                </p>
                <p className="mb-4 text-gray-700">
                    <strong>Technologies used:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>React for building the user interface</li>
                        <li>Socket.io for real-time communication</li>
                        <li>PeerJS for WebRTC-based peer-to-peer connections</li>
                        <li>Tailwind CSS for styling the components</li>
                        <li>Node.js and Express for the backend server</li>
                    </ul>
                </p>
                <p className="mb-4 text-gray-700">
                    <strong>Learning outcomes:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Understanding of WebRTC and peer-to-peer connections</li>
                        <li>Experience with real-time communication using Socket.io</li>
                        <li>Building a responsive UI with React and Tailwind CSS</li>
                        <li>Managing state and context in a React application</li>
                        <li>Handling user media streams and video elements in the browser</li>
                    </ul>
                </p>
                <h1 className="text-2xl font-semibold mt-4 text-lime-600 mb-4 text-center">Create Room</h1>
                <button 
                    onClick={initRoom} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                >
                    Start a new meeting in a room
                </button>
            </div>
        </div>
    )
}

export default CreateRoom;
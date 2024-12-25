import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
            setIsVideoEnabled(!isVideoEnabled);
        }
    };

    const toggleAudio = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
            setIsAudioEnabled(!isAudioEnabled);
        }
    };

    return (
        <div className="relative">
            <video
                ref={videoRef}
                style={{ width: '400px', height: '400px', transform: 'scaleX(-1)' }}
                autoPlay
                muted
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                    onClick={toggleAudio}
                    className="bg-gray-800 text-white p-2 rounded-full"
                >
                    <FontAwesomeIcon icon={isAudioEnabled ? faMicrophone : faMicrophoneSlash} />
                </button>
                <button
                    onClick={toggleVideo}
                    className="bg-gray-800 text-white p-2 rounded-full"
                >
                    <FontAwesomeIcon icon={isVideoEnabled ? faVideo : faVideoSlash} />
                </button>
            </div>
        </div>
    );
};

export default UserFeedPlayer;
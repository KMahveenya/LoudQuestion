import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";

function GamePage() {
    const {roomUsers, sendMessage} = useSocket();

    useEffect(() => {
        return () => {
            sendMessage('leaveRoom');
        };
    }, []);

    return (
        <div>
            {Object.values(roomUsers).map((username) => 
                <p>{username}</p>
            )}
        </div>
    );
}

export default GamePage;
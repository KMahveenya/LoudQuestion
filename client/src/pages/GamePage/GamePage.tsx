import { useSocket } from "../../hooks/useSocket";

function GamePage() {
    const {roomUsers} = useSocket();
    const qwe = Object.values(roomUsers);
    return (
        <div>
            {Object.values(roomUsers).map((username) => 
                <p>{username}</p>
            )}
        </div>
    );
}

export default GamePage;
import { useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const {sendMessage, rooms} = useSocket();

    const [username, setUsername] = useState('');
    const [roomname, setRoomname] = useState('');

    function handleRoomCreate() {
        sendMessage('joinRoom', {roomId: null, username, roomname});
        navigate('/game');
    }

    return (
        <div>
            <form action={handleRoomCreate}>
                <label htmlFor="username">Имя пользователя:</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="roomname">Имя комнаты:</label>
                <input id="roomname" type="text" value={roomname} onChange={(e) => setRoomname(e.target.value)}/>

                <input type="submit" value="Создать комнату" />
            </form>

            {Object.values(rooms)}


        </div>
    );
}

export default LoginPage;
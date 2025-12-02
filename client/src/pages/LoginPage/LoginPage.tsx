import { useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { Container, FormContainer, Form, Label, TextInput, SubmitButton, TableContainer, Table, TableRow, TableCell, JoinButton } from "./style";

function LoginPage() {
    const navigate = useNavigate();

    const {sendMessage, rooms} = useSocket();

    const [username, setUsername] = useState('');
    const [roomname, setRoomname] = useState('');

    function handleRoomCreate() {
        sendMessage('joinRoom', {roomId: null, username, roomname});
        navigate('/game');
    }

    function handleJoinRoom(roomId: string) {
        sendMessage('joinRoom', {roomId, username, roomname});
        navigate('/game');
    }

    return (
        <Container>
            <FormContainer>
                <Form action={handleRoomCreate}>
                    <Label htmlFor="username">Имя пользователя:</Label>
                    <TextInput id="username" type="text" placeholder="Введите свое имя" value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <Label htmlFor="roomname">Имя комнаты:</Label>
                    <TextInput id="roomname" type="text" placeholder="Введите имя комнаты" value={roomname} onChange={(e) => setRoomname(e.target.value)}/>

                    <SubmitButton type="submit" value="Создать комнату" />
                </Form>
            </FormContainer>

            <TableContainer>
                <Table>
                    <thead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Комнаты</TableCell>
                            <TableCell>Войти</TableCell>
                        </TableRow>
                    </thead>
                    <tbody>
                        {Object.entries(rooms).map(([key, value], index) =>
                            <TableRow key={key}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{value}</TableCell>
                                <TableCell><JoinButton onClick={() => handleJoinRoom(key)}>Присоединиться</JoinButton></TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default LoginPage;
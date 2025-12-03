import { useSocket } from "../../hooks/useSocket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, HeaderMessage, TableContainer, UsersTable, TableRow, UserName, UserRole, RoleImage, SubmitButton, ErrorMessage, FormContainer, Form, Label, TextInput, TextArea} from "./style";
import crownImage from '../../assets/images/crown.png';
import askerImage from '../../assets/images/asker.png';
import readerImage from '../../assets/images/reader.png';

function GamePage() {
    const {clientId, roomId, roomUsers, roomOwner, asker, reader, gameReady, sendMessage} = useSocket();
    const [userRoles, setUserRoles] = useState<Map<string, "asker" | "reader">>(new Map());

    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            sendMessage('leaveRoom');
        };
    }, []);

    function handleChangeRole(clientId: string) {
        setError(null);

        setUserRoles(prev => {
            const newMap = new Map(prev);
            const currentRole = newMap.get(clientId);
            
            if (currentRole == null) {
                newMap.set(clientId, 'asker');
            } else if (currentRole === 'asker') {
                newMap.set(clientId, 'reader');
            } else {
                newMap.delete(clientId);
            }
            
            return newMap;
        });
    }

    function handleConfirmRoles() {
        let asker: string[] = []
        let reader: string[] = [];

        userRoles.forEach((role, clientId) => {
            if (role == 'asker') {
                asker.push(clientId);
            } else {
                reader.push(clientId);
            }
        })

        if (asker.length == 1 && reader.length == 1) {
            sendMessage('userRoles', {roomId, asker: asker[0], reader: reader[0]})
        } else {
            setError("Нужно выбрать по одному задающему и читающему");
        }
    }

    function handleConfirmQuestionAndAnswer() {
        sendMessage('questionAndAnswer', {roomId, question, answer});
    }

    function handleStartGame() {
        sendMessage('startGame', {roomId});
    }

    return (
        <Container>
            {clientId == roomOwner && !asker && !gameReady && (
                <HeaderMessage>Назначьте задающего и читающего</HeaderMessage>
            )}
            {clientId != roomOwner && !asker && !gameReady && (
                <HeaderMessage>Хост назначает роли...</HeaderMessage>
            )}
            {clientId != asker && asker && !gameReady && (
                <HeaderMessage>Задающий пишет вопрос...</HeaderMessage>
            )}
            {clientId == asker && asker && !gameReady && (
                <HeaderMessage>Напишите вопрос и ответ</HeaderMessage>
            )}
            {gameReady && (
                <HeaderMessage>Всё готово к игре</HeaderMessage>
            )}
            {(clientId != asker || !asker || gameReady) && (
                <TableContainer>
                    <UsersTable>
                        <tbody>
                            {Object.entries(roomUsers).map(([id, username], index) => (
                                <TableRow key={index}>
                                    <UserRole>
                                        {(() => {
                                            const isOwner = id == roomOwner;
                                            const isAsker = userRoles.get(id) == 'asker' || asker == id;
                                            const isReader = userRoles.get(id) == 'reader' || reader == id;
                                            
                                            if (isAsker) {
                                                return <RoleImage src={askerImage} alt="askerImage" />;
                                            } else if (isReader) {
                                                return <RoleImage src={readerImage} alt="readerImage" />;
                                            } else if (isOwner) {
                                                return <RoleImage src={crownImage} alt="crownImage" />;
                                            }
                                        })()}
                                    </UserRole>
                                    {clientId == roomOwner ? (
                                        <UserName onClick={() => handleChangeRole(id)}>
                                            {username}
                                        </UserName>
                                    ) : (
                                        <UserName>
                                            {username}
                                        </UserName>
                                    )}
                                </TableRow>
                            ))}
                        </tbody>
                    </UsersTable>
                </TableContainer>
            )}

            {clientId == asker && !gameReady && (
                <FormContainer>
                    <Form action={handleConfirmQuestionAndAnswer}>
                        <Label htmlFor="question">Текст вопроса:</Label>
                        <TextArea id='question' placeholder="Вопрос" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                        <Label htmlFor="answer">Текст ответа:</Label>
                        <TextInput id='answer' type="text" placeholder="Ответ" value={answer} onChange={(e) => setAnswer(e.target.value)}/>    
                        <SubmitButton type="submit" value="Подтвердить">Подтвердить</SubmitButton>
                    </Form>
                </FormContainer>
            )}

            {clientId == roomOwner && !asker && (
                <SubmitButton onClick={handleConfirmRoles}>Подтвердить</SubmitButton>
            )}

            {gameReady && clientId == roomOwner && (
                <SubmitButton onClick={handleStartGame}>Начать игру</SubmitButton>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
}

export default GamePage;
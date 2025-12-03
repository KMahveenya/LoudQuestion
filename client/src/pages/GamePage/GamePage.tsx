import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";
import { Container, SubmitButton} from "./style";
import HeaderMessage from "../../components/HeaderMessage";
import UserTable from "../../components/UserTable";
import QuestionAndAnswerForm from "../../components/QuestionAndAnswerForm";

function GamePage() {
    const {clientId, roomId, roomOwner, gameReady, sendMessage} = useSocket();

    useEffect(() => {
        return () => {
            sendMessage('leaveRoom');
        };
    }, []);

    function handleStartGame() {
        sendMessage('startGame', {roomId});
    }

    return (
        <Container>
            <HeaderMessage />
            <UserTable />
            <QuestionAndAnswerForm />

            {gameReady && clientId == roomOwner && (
                <SubmitButton onClick={handleStartGame}>Начать игру</SubmitButton>
            )}
        </Container>
    );
}

export default GamePage;
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";
import { Container} from "./style";
import HeaderMessage from "../../components/HeaderMessage";
import UserTable from "../../components/UserTable";
import QuestionAndAnswerForm from "../../components/QuestionAndAnswerForm";
import GamePart from "../../components/GamePart";

function GamePage() {
    const {sendMessage} = useSocket();

    useEffect(() => {
        return () => {
            sendMessage('leaveRoom');
        };
    }, []);

    return (
        <Container>
            <HeaderMessage />
            <UserTable />
            <QuestionAndAnswerForm />
            <GamePart />
        </Container>
    );
}

export default GamePage;
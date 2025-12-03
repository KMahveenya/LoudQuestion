import { useSocket } from "../../hooks/useSocket";
import { Message } from "./style";

function HeaderMessage() {
    const {clientId, roomOwner, asker, gameReady} = useSocket();

    return (
        <>
            {clientId == roomOwner && !asker && !gameReady && (
                <Message>Назначьте задающего и читающего</Message>
            )}
            {clientId != roomOwner && !asker && !gameReady && (
                <Message>Хост назначает роли...</Message>
            )}
            {clientId != asker && asker && !gameReady && (
                <Message>Задающий пишет вопрос...</Message>
            )}
            {clientId == asker && asker && !gameReady && (
                <Message>Напишите вопрос и ответ</Message>
            )}
            {gameReady && (
                <Message>Всё готово к игре</Message>
            )}
        </>
    );
}

export default HeaderMessage;
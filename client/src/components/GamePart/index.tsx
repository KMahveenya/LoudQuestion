import { useSocket } from "../../hooks/useSocket";
import { SubmitButton } from "./style";
import { useEffect, useState } from "react";

function GamePart() {
    const {clientId, roomId, roomOwner, gameReady, question, answer, gameStart, asker, gameEnd, sendMessage} = useSocket();

    const [myAnswer, setMyAnswer] = useState('');
    const [freezeAnswer, setFreezeAnswer] = useState(false);

    useEffect(() => {
        setFreezeAnswer(false);
        setMyAnswer('');
    }, [gameReady]);

    function handleStartGame() {
        sendMessage('startGame', {roomId});
    }

    function handleEnterAnswer() {
        setFreezeAnswer(true);
        sendMessage('enterAnswer', {roomId});
    }

    function handleEndGame() {
        sendMessage('endGame', {roomId});
    }

    return (
        <>
            {gameReady && clientId == roomOwner && (
                <SubmitButton onClick={handleStartGame}>Начать игру</SubmitButton>
            )}

            {question && (gameStart || gameEnd) && (
                <div>
                    <p>{question}</p>
                </div>
            )}

            {answer && (
                <div>
                    <p>{answer}</p>
                </div>
            )}

            {gameStart && !freezeAnswer && asker != clientId && (
                <form action={handleEnterAnswer}>
                    <input type="text" placeholder="Ответ" value={myAnswer} onChange={(e) => setMyAnswer(e.target.value)}/>
                    <input type="submit" value="Подтвердить" />
                </form>
            )}

            {(gameStart || gameEnd) && freezeAnswer && asker != clientId && (
                <p>{myAnswer}</p>
            )}

            {gameEnd && asker == clientId && (
                <>
                    <button onClick={handleEndGame}>Верно</button>
                    <button onClick={handleEndGame}>Не верно</button>
                </>
            )}
        </>
    );
}

export default GamePart;
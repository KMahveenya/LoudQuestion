import { useSocket } from "../../hooks/useSocket";
import { SubmitButton, TextInput, Form, SubmitInput, QuestionContainer, AnswerContainer, MyAnswerContainer } from "./style";
import { useEffect, useState } from "react";
import Timer from "../Timer";

function GamePart() {
    const {clientId, roomId, roomOwner, gameReady, question, answer, gameStart, asker, gameEnd, reader, sendMessage} = useSocket();

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

            <Timer />

            {question && (gameStart || gameEnd) && (
                <QuestionContainer>
                    {question}
                </QuestionContainer>
            )}
            {clientId == reader && gameStart && 
                <AnswerContainer>
                    {answer}
                </AnswerContainer>
            }
            

            {gameStart && !freezeAnswer && asker != clientId && (
                <MyAnswerContainer>
                    <Form action={handleEnterAnswer}>
                        <TextInput type="text" placeholder="Ответ" value={myAnswer} onChange={(e) => setMyAnswer(e.target.value)}/>
                        <SubmitInput type="submit" value="Подтвердить" />
                    </Form>
                </MyAnswerContainer>
            )}

            {(gameStart || gameEnd) && freezeAnswer && asker != clientId && (
                <MyAnswerContainer>{myAnswer}</MyAnswerContainer>
            )}

            {gameEnd && asker == clientId && (
                <MyAnswerContainer>
                    <SubmitButton onClick={handleEndGame}>Верно</SubmitButton>
                    <SubmitButton onClick={handleEndGame}>Не верно</SubmitButton>
                </MyAnswerContainer>
            )}
        </>
    );
}

export default GamePart;
import { useSocket } from "../../hooks/useSocket";
import { SubmitButton, TextInput, Form, SubmitInput, QuestionContainer, AnswerContainer, MyAnswerContainer } from "./style";
import { useEffect, useState, useRef } from "react";
import Timer from "../Timer";

function GamePart() {
    const {clientId, roomId, roomOwner, gameReady, question, answer, gameStart, asker, gameEnd, reader, sendMessage} = useSocket();

    const [myAnswer, setMyAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [freezeAnswer, setFreezeAnswer] = useState(false);
    const [timerStart, setTimerStart] = useState(false);
    const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setFreezeAnswer(false);
        setMyAnswer('');
    }, [gameReady]);

    useEffect(() => {
        if (gameStart) {
            setTimerStart(false);
            
            if (timerTimeoutRef.current) {
                clearTimeout(timerTimeoutRef.current);
            }
            
            timerTimeoutRef.current = setTimeout(() => {
                setTimerStart(true);
            }, 6500);
        } else {
            setTimerStart(false);
            
            if (timerTimeoutRef.current) {
                clearTimeout(timerTimeoutRef.current);
                timerTimeoutRef.current = null;
            }
        }
        
        return () => {
            if (timerTimeoutRef.current) {
                clearTimeout(timerTimeoutRef.current);
            }
        };
    }, [gameStart]);

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

    function handleShowAnswer() {
        if (answer) {
            setShowAnswer(true);
        }
    }

    return (
        <>
            {gameReady && clientId == roomOwner && (
                <SubmitButton onClick={handleStartGame}>Начать игру</SubmitButton>
            )}

            <Timer timerStart={timerStart}/>

            {question && (gameStart || gameEnd) && (
                <QuestionContainer>
                    {timerStart && question}
                </QuestionContainer>
            )}
            {clientId == reader && gameStart &&
                <AnswerContainer onClick={handleShowAnswer}>
                    {showAnswer && answer}
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
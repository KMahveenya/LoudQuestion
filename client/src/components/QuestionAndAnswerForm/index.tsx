import { useSocket } from "../../hooks/useSocket";
import { FormContainer, Form, Label, TextArea, TextInput, SubmitButton } from "./style";
import { useState, useEffect } from "react";

function QuestionAndAnswerForm() {
    const {roomId, clientId, asker, gameReady, gameStart, gameEnd, sendMessage} = useSocket();

    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        setQuestion('');
        setAnswer('');
    }, [gameEnd]);

    function handleConfirmQuestionAndAnswer() {
        sendMessage('questionAndAnswer', {roomId, question, answer});
    }

    return (
        <>
            {clientId == asker && !gameReady && !gameStart && !gameEnd && (
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
        </>
    );
}

export default QuestionAndAnswerForm;
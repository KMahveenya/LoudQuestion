import styled from "styled-components";

export const SubmitButton = styled.button `  
  width: 60%;
  margin: 20px auto;
  font-family: 'BasicFont';
  font-size: 20px;
  background-color: #2A8DDE;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #3394e4ff;
  }

  &:active {
    background-color: #4088c3ff;
  }
`

export const SubmitInput = styled.input `  
  width: 60%;
  margin: 10px auto;
  font-family: 'BasicFont';
  font-size: 20px;
  background-color: #2A8DDE;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #3394e4ff;
  }

  &:active {
    background-color: #4088c3ff;
  }
`

export const Form = styled.form `  
  display: flex;
  flex-direction: column;
`

export const TextInput = styled.input `  
  font-family: 'BasicFont';
  font-size: 20px;
  margin-bottom: 25px;
  padding: 10px;
  border-radius: 10px;
  outline: 1px solid gray;
  border: none;
  margin: 10px;

  &:focus {
    outline: 2px solid lightblue;
  }
`

export const QuestionContainer = styled.div`
  background-color: #ffffffff;
  width: 90%;
  min-height: 50%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  border: 2px solid #d5d5d5ff;
  font-family: 'QuestionRegularFont';
  font-size: 25px;
  text-align: center;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  margin: 10px;
`

export const AnswerContainer = styled.div`
  background-color: #e2f5d8ff;
  width: 90%;
  min-height: 15%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'QuestionRegularFont';
  font-size: 25px;
  text-align: center;
  overflow-y: scroll;
  box-sizing: border-box;
  margin: 10px;
`

export const MyAnswerContainer = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'QuestionRegularFont';
  font-size: 25px;
  text-align: center;
  justify-content: center;
  margin: 10px;
`
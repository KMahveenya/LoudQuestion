import styled from "styled-components";

export const FormContainer = styled.div `  
  width: 100%;
  max-width: 400px;
`

export const Form = styled.form `  
  display: flex;
  flex-direction: column;
`

export const Label = styled.label `  
  margin-bottom: 10px;
`

export const TextInput = styled.input `  
  font-family: 'BasicFont';
  font-size: 20px;
  margin-bottom: 25px;
  padding: 10px;
  border-radius: 10px;
  outline: 1px solid gray;
  border: none;

  &:focus {
    outline: 2px solid lightblue;
  }
`

export const TextArea = styled.textarea `  
  font-family: 'BasicFont';
  font-size: 20px;
  margin-bottom: 25px;
  padding: 10px;
  border-radius: 10px;
  outline: 1px solid gray;
  border: none;

  &:focus {
    outline: 2px solid lightblue;
  }
`

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
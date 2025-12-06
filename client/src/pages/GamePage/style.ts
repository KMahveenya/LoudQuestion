import styled from "styled-components"

export const Container = styled.div `  
  max-width: 800px;
  width: 80%;
  margin: 10vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #edf7ff;
  height: calc(80vh - 40px);
  border-radius: 30px;
  outline: 2px solid lightgrey;
  box-shadow: 5px 5px 15px gray;
  font-family: 'BasicFont';
  font-size: 20px;
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
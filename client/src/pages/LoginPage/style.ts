import styled from "styled-components";

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

export const SubmitButton = styled.input `  
  width: 60%;
  margin: auto;
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

export const TableContainer = styled.div `  
  width: 100%;
`

export const Table = styled.table `  
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  font-size: 15px;
`

export const TableRow = styled.tr `  

`

export const TableCell = styled.td `  
  border: 1px solid;
  max-width: 150px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const JoinButton = styled.button `  
  background-color: #edf7ff;
  border: none;
  cursor: pointer;
  font-family: 'BasicFont';
  font-size: 15px;

  &:hover {
    color: gray;
  }
`
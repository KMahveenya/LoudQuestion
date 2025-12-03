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

export const HeaderMessage = styled.p `
  font-size: clamp(22px, 4vw, 35px);
  text-align: center;
`;

export const TableContainer = styled.div `
  width: 100%;
  max-height: 60%;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: center;
  display: flex;
`;

export const UsersTable = styled.table `
  border-collapse: collapse;
  max-width: 400px;
  width: 100%;
  border: 2px solid #cacdcfff;
`;

export const TableRow = styled.tr `
  &:nth-child(odd) {
    background-color: #dfe6ebff;
  }
  &:nth-child(even) {
    background-color: #d4dfe6ff;
  }
`;

export const UserRole = styled.td `
  padding: 5px;
  width: 1.5rem;
  height: 2rem;
`;

export const UserName = styled.td `
  padding: 5px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  max-width: 200px;
`;

export const RoleImage = styled.img `
  width: 1.5rem;
`;

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
export const ErrorMessage = styled.p `
  text-align: center;
  color: #ef4545ff;
`;

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
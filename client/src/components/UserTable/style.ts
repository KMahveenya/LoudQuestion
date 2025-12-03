import styled from "styled-components";

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
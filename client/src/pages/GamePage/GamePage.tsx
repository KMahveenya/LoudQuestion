import { useSocket } from "../../hooks/useSocket";
import { useEffect, useState } from "react";
import { Container, HeaderMessage, TableContainer, UsersTable, TableRow, UserName, UserRole, RoleImage, SubmitButton, ErrorMessage} from "./style";
import crownImage from '../../assets/images/crown.png';
import askerImage from '../../assets/images/asker.png';
import readerImage from '../../assets/images/reader.png';

function GamePage() {
    const {clientId, roomUsers, roomOwner, sendMessage} = useSocket();
    const [userRoles, setUserRoles] = useState<Map<string, "asker" | "reader">>(new Map());

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            sendMessage('leaveRoom');
        };
    }, []);

    function handleChangeRole(clientId: string) {
        setError(null);

        setUserRoles(prev => {
            const newMap = new Map(prev);
            const currentRole = newMap.get(clientId);
            
            if (currentRole == null) {
                newMap.set(clientId, 'asker');
            } else if (currentRole === 'asker') {
                newMap.set(clientId, 'reader');
            } else {
                newMap.delete(clientId);
            }
            
            return newMap;
        });
    }

    function handleConfirmRoles() {
        let asker: string[] = []
        let reader: string[] = [];

        userRoles.forEach((role, clientId) => {
            if (role == 'asker') {
                asker.push(clientId);
            } else {
                reader.push(clientId);
            }
        })

        if (asker.length == 1 && reader.length == 1) {
            sendMessage('userRoles', {asker: asker[0], reader: reader[0]})
        } else {
            setError("Нужно выбрать по одному задающему и читающему");
        }
    }

    return (
        <Container>
            {clientId == roomOwner ? (
                <HeaderMessage>Назначьте задающего и читающего</HeaderMessage>
            ) : (
                <HeaderMessage>Хост назначает роли...</HeaderMessage>
            )}
            <TableContainer>
                <UsersTable>
                    <tbody>
                        {Object.entries(roomUsers).map(([id, username], index) => (
                            <TableRow key={index}>
                                <UserRole>
                                    {id == roomOwner && <RoleImage src={crownImage} alt="crown" />}
                                    {userRoles.get(id) == 'asker' && <RoleImage src={askerImage} alt="askerImage" />}
                                    {userRoles.get(id) == 'reader' && <RoleImage src={readerImage} alt="readerImage" />}
                                </UserRole>
                                {clientId == roomOwner && clientId != id ? (
                                    <UserName onClick={() => handleChangeRole(id)}>
                                        {username}
                                    </UserName>
                                ) : (
                                    <UserName>
                                        {username}
                                    </UserName>
                                )}
                            </TableRow>
                        ))}
                    </tbody>
                </UsersTable>
            </TableContainer>

            {clientId == roomOwner && (
                <SubmitButton onClick={handleConfirmRoles}>Подтвердить</SubmitButton>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
}

export default GamePage;
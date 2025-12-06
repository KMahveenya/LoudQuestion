import { useSocket } from "../../hooks/useSocket";
import { TableContainer, UsersTable, TableRow, UserRole, RoleImage, UserName, ErrorMessage, SubmitButton } from "./style";
import { useState } from "react";
import crownImage from '../../assets/images/crown.png';
import askerImage from '../../assets/images/asker.png';
import readerImage from '../../assets/images/reader.png';

function UserTable() {
    const {roomId, clientId, roomOwner, asker, roomUsers, reader, gameReady, gameStart, gameEnd, sendMessage} = useSocket();

    const [userRoles, setUserRoles] = useState<Map<string, "asker" | "reader">>(new Map());
    const [error, setError] = useState<string | null>(null);

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
            sendMessage('userRoles', {roomId, asker: asker[0], reader: reader[0]})
            setUserRoles(new Map());
        } else {
            setError("Нужно выбрать по одному задающему и читающему");
        }
    }

    return (
        <>
            {(clientId != asker || !asker || gameReady) && !gameStart&& !gameEnd  && (
                <TableContainer>
                    <UsersTable>
                        <tbody>
                            {Object.entries(roomUsers).map(([id, username], index) => (
                                <TableRow key={index}>
                                    <UserRole>
                                        {(() => {
                                            const isOwner = id == roomOwner;
                                            const isAsker = userRoles.get(id) == 'asker' || asker == id;
                                            const isReader = userRoles.get(id) == 'reader' || reader == id;
                                            
                                            if (isAsker) {
                                                return <RoleImage src={askerImage} alt="askerImage" />;
                                            } else if (isReader) {
                                                return <RoleImage src={readerImage} alt="readerImage" />;
                                            } else if (isOwner) {
                                                return <RoleImage src={crownImage} alt="crownImage" />;
                                            }
                                        })()}
                                    </UserRole>
                                    {clientId == roomOwner ? (
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
            )}

            {clientId == roomOwner && !asker && (
                <SubmitButton onClick={handleConfirmRoles}>Подтвердить</SubmitButton>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
}

export default UserTable;
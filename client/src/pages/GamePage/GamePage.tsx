import { useSocket } from "../../hooks/useSocket";
import { useEffect, useState } from "react";
import { Container } from "./style";
import crownImage from '../../assets/images/crown.png';
import askerImage from '../../assets/images/asker.png';
import readerImage from '../../assets/images/reader.png';
import { send } from "vite";

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
            {clientId == roomOwner && (
                <p>Назначьте задающего и читающего</p>
            )}

            <table>
                <tbody>
                    {Object.entries(roomUsers).map(([id, username], index) => (
                        <tr key={index}>
                            <td>
                                {id == roomOwner && <img src={crownImage} alt="crown" />}
                                {userRoles.get(id) == 'asker' && <img src={askerImage} alt="askerImage" />}
                                {userRoles.get(id) == 'reader' && <img src={readerImage} alt="readerImage" />}
                            </td>
                            {clientId == roomOwner && clientId != id ? (
                                <td onClick={() => handleChangeRole(id)}>
                                    {username}
                                </td>
                            ) : (
                                <td>
                                    {username}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {clientId == roomOwner && (
                <button onClick={handleConfirmRoles}>Подтвердить</button>
            )}

            {error && <p>{error}</p>}
        </Container>
    );
}

export default GamePage;
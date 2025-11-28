import { useSocket } from "../../hooks/useSocket";

function TestComponent() {
    const {isConnected, clientId} = useSocket();

    return (
        <div>
            {isConnected + ' - ' + clientId}
        </div>
    )
}

export default TestComponent;
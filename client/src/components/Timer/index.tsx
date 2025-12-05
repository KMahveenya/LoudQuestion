import { useSocket } from "../../hooks/useSocket";
import { useTimer } from '@siberiacancode/reactuse';
//import {  } from "./style";

function Timer() {
    const {gameStart} = useSocket();

    const timer = gameStart ? useTimer(60) : null;

    return (
        <>
            {gameStart && 
                <p>{String(timer?.minutes).padStart(2, '0')}:{String(timer?.seconds).padStart(2, '0')}</p>
            }
        </>
    );
}

export default Timer;
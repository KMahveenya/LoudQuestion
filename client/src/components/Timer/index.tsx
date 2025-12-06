import { useSocket } from "../../hooks/useSocket";
import { useTimer } from '@siberiacancode/reactuse';
import { useRef, useEffect } from "react";
import { Time } from "./style";

function Timer({ timerStart }: { timerStart: boolean }) {
    const { gameStart } = useSocket();
    
    const timer = useTimer(60);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/audios/Громкий-вопрос-музыка-для-игры-v1.mp3');
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;

        if (gameStart) {
            audioRef.current.play().catch((e) => {
                console.log("Аудио не запустилось автоматически:", e.message);
            });
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [gameStart]);

    useEffect(() => {
        if (timerStart && timer.start) {
            timer.start();
        } else {
            if (timer.pause) timer.pause();
        }
    }, [timerStart]);

    return (
        <>
            {gameStart && 
                <Time>
                    {timerStart 
                        ? `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`
                        : "01:00"
                    }
                </Time>
            }
        </>
    );
}

export default Timer;
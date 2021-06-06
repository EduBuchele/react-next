import { useState, useEffect } from 'react';
import styles from '../styles/components/CountDown.module.css'

let coundownTimeout: NodeJS.Timeout;

export function CountDown() {
    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFineshed] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(coundownTimeout);
        setIsActive(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            coundownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFineshed(true);
            setIsActive(false);
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>


            </div>
            {hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo encerrado
                </button>
            ) : !isActive ? (
                <button
                    onClick={startCountdown}
                    type="button"
                    className={styles.countdownButton}
                >
                    Iniciar novo ciclo
                </button>
            ) : (
                <button
                    onClick={resetCountdown}
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                >
                    Abandonar ciclo
                </button>
            )}


        </div>
    )
}
import React, {useState, useEffect} from 'react';

export default function Timer() {
    const [seconds, setSeconds] = useState(10);

    // const inputTimer = setInterval(() => {
    //     console.log('test')
    //     if (timeLeft <= 0) {
    //         clearInterval(inputTimer);
    //     }
    //     // console.log('test')
    //     console.log(timeLeft)
    //     setTimeLeft(timeLeft - 1)
    // }, 1000)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    // useEffect(() => {
    //     if (seconds === 0) {
    //         clearInterval(interval)
    //     }
    // }, [seconds])

    return (
        <div>{seconds}</div>
    )
}
import React, {useState, useEffect} from 'react';
import styles from './Main.module.css';
import ding from 'assets/sounds/Ding.mp3';
import getRandomItem from 'utilities/getRandomItem';

// Pick random item to display: Done
// Show item on screen for 5 seconds
// Number of correct inputs
// add a counting down progress bar
// clear input after successful guess

export default function Main() {
    const [currentItem, setCurrentItem] = useState(getRandomItem())
    const [value, setValue] = useState('');
    const [isInputCorrect, setisInputCorrect] = useState(false);
    const [seconds, setSeconds] = useState(10);

    const audio = new Audio(ding);

    // Timer 
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (seconds <= 0) {
            setCurrentItem(getRandomItem)
            setSeconds(10)
        } 
    }, [seconds])

    const renderItem = () => {
        return (
            <div>
                <img src={currentItem.image} />
            </div>
        )
    }

    // Input validation
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        const value = event.target.value.toLowerCase();
        setValue(value)
        if (value === currentItem.name.toLowerCase()) {
            setisInputCorrect(true);
            setCurrentItem(getRandomItem)
            setValue('');
            audio.play();
        } else {
            setisInputCorrect(false);
        }
    }


    return (
        <div>
            {seconds}
            {renderItem()}
            <input value={value} onChange={handleChange} />
            {isInputCorrect && 
                (<div className={styles.correct}>
                    Correct
                </div>)
            }
        </div>
    )
}
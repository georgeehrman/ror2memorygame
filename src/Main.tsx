import items from './Items';
import React, {useState, useEffect} from 'react';
import styles from './Main.module.css';
import ding from 'assets/sounds/Ding.mp3';
import getRandomInt from 'utilities/getRandomInt';
import Timer from 'Timer';

// Pick random item to display: Done
// Show item on screen for 5 seconds
// Number of correct inputs
// add a counting down progress bar
// clear input after successful guess

export default function Main() {
    const [currentItemId, setCurrentItemId] = useState(getRandomInt(items.length));
    const [value, setValue] = useState('');
    const [isInputCorrect, setisInputCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    const audio = new Audio(ding);

    const renderItems = () => 
        items.map((item) => 
            <div>
                {item.name}
                <img src={require('assets/' + item.image).default} />
            </div>
        );

    const renderItem = () => {
        console.log('render item');
        const item = items[currentItemId];
        return (
            <div>
                {/* {item.name} */}
                <img src={item.image} />
            </div>
        )
    }

    useEffect(() => {
        // renderItem();
        // setInterval(() => renderItem(), 1)
    }, [])

    // Input validation
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        const value = event.target.value.toLowerCase();
        setValue(value)
        if (value === items[currentItemId].name.toLowerCase()) {
            setisInputCorrect(true);
            setCurrentItemId(getRandomInt(items.length))
            setValue('');
            audio.play();
        } else {
            setisInputCorrect(false);
        }
    }

    const renderTimer = () => {
        const inputTimer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(inputTimer);
            }
            // console.log('test')
            // console.log(timeLeft)
            // setTimeLeft(timeLeft - 1)
        }, 1000)
        return (
           <h1>{timeLeft}</h1>
        )
    }

    return (
        <div>
            {/* {renderTimer()} */}
            <Timer />
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
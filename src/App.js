import React, { useEffect } from "react"
import {nanoid} from "nanoid"
import {useState} from "react"
import Die from "./components/Die"

import "./assets/main.css"

export default function App() {
    const [dice, setDice] = useState(generateNewDice());

    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if(allHeld && allSameValue) {
            console.log("You win");
            setTenzies(true);
        }
    }, [dice])

    function generateNewDice() {
        const newDice = [];
        for(let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function generateNewDie() {
        const randomDie = Math.ceil(Math.random() * 6);
        return {
            id: nanoid(),
            value: randomDie,
            isHeld: false
        }
    }


    function holdValue(id) {
        setDice((prevDice) => {
            return prevDice.map((die) => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            })
        })
    }

    function rollDice() {
        setDice((prevDice) => {
            return prevDice.map((die) => {
                return die.isHeld === true ? die : generateNewDie()
            })
        })
    }

    const dieElements = dice.map((die) => {
        return (
            <Die value={die.value} key={die.id} isHeld={die.isHeld} holdValue={() => holdValue(die.id)} />
        )
    })

    return (
        <main>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className="die-container">
                {dieElements}
            </div>

            <button onClick={rollDice} className="roll-button">Roll</button>
        </main>
    )
}
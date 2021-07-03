import {useState} from "react";
import "../css/style.css";
import RestGame from "./components/RestGame";
import Modal from "./components/Modal";
import HighScore from "./components/HighScore";
import tableData from "../resources/data/tableData.json"
import tableStructure from "../resources/data/tableStructure.json";

export default function App() {
    const [clicks, setClicks] = useState(0);
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const [nextNumber, setNextNumber] = useState(0);
    const [isOutOfClicks, setIsOutOfClicks] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [validationErrors, setValidationErrors] = useState(false);
    const [database, setDataInDatabase] = useState(tableData);

    const plusMinus = () => {
        if (isOutOfClicks) return;

        const randomVal = Math.floor(Math.random() * 100);
        const newAmount = Math.random() > 0.5 ? randomVal : -1 * randomVal;

        setNextNumber(newAmount);
        setScore(nextNumber + newAmount);
        setClicks(clicks + 1);
        setIsOutOfClicks(9 - clicks === 0);
    };

    const sendToBackend = () => {
        if (!name || name.trim().length < 3) {
            setValidationErrors(true);
            return
        }

        database.push({name, score, clicks, average: (score/clicks).toFixed(2)})

        setModalText(`Pretending save name, score and clicks to a database.`);
        setOpenModal(true);
        setTimeout(() => {
            setClicks(0);
            setScore(0);
            setNextNumber(0);
            setIsOutOfClicks(false);
            setName("");
            setDataInDatabase( [...database]);
            setOpenModal(false);
        }, 3500);
    };

    const updatePlayerName = (event) => {
        setName(event.target.value);

        if (event.target.value.trim().length >= 3) {
            setValidationErrors(false);
        }
    };

    const restGame = async () => {
        setModalText(`Pretending to do something fancy on the backend.`);
        setOpenModal(true);

        setTimeout(() => {
            setClicks(0);
            setScore(0);
            setNextNumber(0);
            setIsOutOfClicks(false);
            setOpenModal(false);
        }, 2500);
    }

    return (
        <>
            <div className="App">
                <div className="header">
                    <h1>High Score App</h1>
                </div>

                <div className="howTo">
                    <h2>How the game works?</h2>
                    <p>By clicking the 'Generate Random Numbers' button you will get a number between -100 and
                        100. <br/>
                        This will get added to your total score.<br/>
                        Try submit the highest score you can.<br/>
                        Careful you only get 10 attempts per session.</p>
                </div>
                <div className="controller">
                    <div className="scoreSec">
                        <p>{score}</p>
                    </div>

                    <div className="randomNumberSec">
                        <button disabled={isOutOfClicks} className={`defaultBtn ${isOutOfClicks ? 'disabled' : ''}`}
                                onClick={plusMinus}>Generate Random Numbers
                        </button>
                        <p>{nextNumber}<span>Random number</span></p>
                        <p>{10 - clicks}<span>Clicks left</span></p>
                    </div>

                    {isOutOfClicks ? <RestGame clickEvt={restGame}/> : null}

                </div>
                <div className="submitSection">
                    <input
                        className={validationErrors ? 'error' : ''}
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={updatePlayerName}
                    />
                    <button className="submitBtn" type="submit" onClick={sendToBackend}>
                        Submit
                    </button>
                </div>
                {validationErrors ?
                    <p className='errorMsg'>You can't submit a score without a valid name.<br/>Your name must be at
                        least 3 letters.</p> : null}
            </div>

            <HighScore tableData={database} tableStructure={tableStructure} />

            {openModal ? <Modal text={modalText}/> : null}
        </>
    );
}

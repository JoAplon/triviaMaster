import React, { useState, useContext } from "react";
import '../css/difficulty.css';
import { GlobalData } from "../context/GlobalContext";

const DifficultyMenu = ({ difficulties, onSelect, onClose }) => {
    const { selectedDifficulty, setSelectedDifficulty } = useContext(GlobalData);

    const handleRadioChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleDone = () => {
        if (selectedDifficulty) {
            onSelect(selectedDifficulty);
            console.log('Selected difficulty:', selectedDifficulty);
            onClose();
        }
    };

    return (
        <div className="difficulty-menu">
            <h3>Choose Difficulty:</h3>
            <div className="diffOptions">
                {difficulties.map((difficulty) => (
                    <label className="diffLabel" key={difficulty}>
                        <input
                            type="radio"
                            name="difficulty"
                            value={difficulty}
                            checked={selectedDifficulty === difficulty}
                            onChange={() => handleRadioChange(difficulty)}
                        />
                        {difficulty}
                    </label>
                ))}
            </div>
            <button className="menuButton" onClick={handleDone}>Done</button>
        </div>
    );
};

export default DifficultyMenu;

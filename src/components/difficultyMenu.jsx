import React, { useState } from "react";

const DifficultyMenu = ({ difficulties, onSelect, onClose }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    const handleRadioChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleDone = () => {
        // do something with selected mode
        if (selectedDifficulty) {
            onSelect(selectedDifficulty)
            onClose();
        }
    };

    return (
        <div className="difficulty-menu">
            <h3>Choose Difficulty:</h3>
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
            <button className="menuButton" onClick={handleDone}>Done</button>
        </div>
    );
};

export default DifficultyMenu;
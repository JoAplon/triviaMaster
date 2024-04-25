// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Tooltip = () => {
    return (
                <ul>

                    <li className='directions'>
                        <button className='directionsButton'>#</button>
                        <div className='directionsTooltip'>
                            You can play without making an account.
                            Choose your difficulty, categories, and number of questions then play on!
                            If you have an account or want to signup just hit that profile button to get started.

                        </div>
                    </li>
                </ul>
        


    );
}

export default Tooltip;

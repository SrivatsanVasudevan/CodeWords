import React, {useState, useEffect} from 'react';
import Game from '../game/game';

const LandingPage = () => {

    const [playerName, setPlayerName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [changeScreen, setChangeScreen] = useState(false);

    
    const nickNameCheck = () => {
        if(!playerName){
            setErrorMessage('Please enter a nickname joining a game!')
            return;
        }
        else{
            setErrorMessage('');
            setChangeScreen(true);
            setPlayerName(playerName);
        }
        return;
    }

    return (
        
        <>
        {!changeScreen ? <div>

            <div>
                <div>
                Enter Nickname
                </div>
                <div>
                    <input type = "text" onChange = {event => setPlayerName(event.target.value)}/>
                </div>

            </div>

            <div>
                <button onClick = {nickNameCheck} > Create New Game </button>
            </div>
            <div>
                Join an existing game using a room code
                <div>
                    <input type = "text" />
                    <button onClick = {nickNameCheck}> Join Game </button>
                </div>
                
            </div>

            <div>
                {errorMessage}
            </div>
        </div>:
        <div>
            
            <Game playerName = {playerName}/>
            
        </div>
        }
        </>
        
    )
}

export default LandingPage;
import React, {useState,useEffect} from 'react';

const Game = ({playerName}) => {
    const [map, setMap] = useState(new Map());
    const [array, setArray] = useState([]);
    const [spymasterToggle, setSpymasterToggle] = useState(false);
    const [redDisable, setRedDisable] = useState(false);
    const [blueDisable, setBlueDisable] = useState(false);
    const [playerTeam, setPlayerTeam] = useState('');
    const [redCount, setRedCount] = useState(9);
    const [blueCount, setBlueCount] = useState(8);
    const [currentTurn, setCurrentTurn] = useState('Red');
    const [chat, setChat] = useState('');
    const [textAreaChat, setTextAreaChat] = useState('');
    
    

    useEffect(()=> {
        setArray(getWordArray);
        setMap(getGameWords);
    },[])

    const changeTurn = () => {
        currentTurn === 'Red' ? setCurrentTurn('Blue') : setCurrentTurn('Red')
    }

    const togglePlayer = () => {
        setSpymasterToggle(true);
        playerTeam === 'Red' ? setRedDisable(true) : setBlueDisable(true);
    }

    const updateChat = () => {
        setTextAreaChat(chat);
        
        
    }
    
    const getWordArray = () => {
        const array = [];
        for(let i=1;i<=25;i++){
            array.push(`Word${i}`);
        }
        return array;
    }

    const getGameWords = () => {
        const array = [];
        const map = new Map();
        const gameOptions = ['Red','Blue','Neutral','Bomb'];
        let redCount = 0;
        let blueCount = 0;
        let getNeutralCount = 0;
        let bombCount = 0;
        let index = 0;
        let redCheck = false;
        let blueCheck = false;
        let neutralCheck = false;
        let bombCheck = false;
        for(let i=1;i<=25;i++){
            array.push(`Word${i}`)
            let randomOption = gameOptions[Math.floor(Math.random()*gameOptions.length)];
            map.set(`Word${i}`,randomOption);
            if(randomOption === 'Red'){
                redCount++;
            }
            else if(randomOption === 'Blue'){
                blueCount++;
            }
            else if(randomOption === 'Neutral'){
                getNeutralCount++;
            }
            else if(randomOption === 'Bomb'){
                bombCount++;
            }
            if(redCount === 9  && !redCheck){
                index = 0;
                gameOptions.splice(index,1);
                redCheck = true;
            }
            if(blueCount === 8 && !blueCheck){
                index = 1;
                gameOptions.splice(index,1);
                blueCheck = true;
            }
            if(getNeutralCount === 7 && !neutralCheck){
                index = 2;
                gameOptions.splice(index,1);
                neutralCheck = true;
            }
            if(bombCount === 1 ** !bombCheck){
                index = 3;
                gameOptions.splice(index,1);
                bombCheck = true;
            }
            
            
        }
        console.log(map);
        return map;
    }


    

    const teamSelection = (event) => {
        setPlayerTeam(event.target.value);
    }

    const checkColor = (event) => {
        //const map = getGameWords();
        let color = map.get(event.currentTarget.value);
        console.log(map.get(event.currentTarget.value) );
        console.log(playerTeam);
        if(playerTeam === color){
            color === 'Red' ? setRedCount(redCount-1) : setBlueCount(blueCount-1);
        }
        
        if(redCount === 0){
            console.log('blue team wins!');
        }
        else if(blueCount === 0){
            console.log('red team wins!');
        }
        console.log(redCount, blueCount);
    }

    
    return (
        <>
        <div>
            Hello {playerName}!
        </div>

        <div>
            <button value = 'Red' onClick = {event => teamSelection(event)}> Join Red Team! </button>
            <button value = 'Red Spymaster' disabled = {redDisable}
            onClick = {togglePlayer}
            > Red Spymaster </button>
        </div>

        <div>
            <button value = 'Blue' onClick = {event => teamSelection(event)}> Join Blue Team! </button>
            <button value = 'Blue Spymaster' disabled = {blueDisable}
            onClick = {togglePlayer}
            > Blue Spymaster </button>
        </div>
        <div>
            <button onClick = {changeTurn}> End Turn </button>
            <p> {currentTurn}'s Turn </p>
        </div>

        <div>
            Red: {redCount}
            Blue: {blueCount}
        </div>

        <div>
            {array.map((word,index)=> {
                return (
                    <button onClick = {event => checkColor(event)} key = {index} value = {word}>
                        {spymasterToggle ? map.get(word) : word}
                    </button>
                )
            })}
        </div>
        <div>
            Chat: 
            <input type = 'text' onChange = {event => setChat(` ${playerName}: ${event.target.value}`)}/>
        </div>
        <button onClick = {updateChat} > Chat </button>
        <div>
            <textarea value = {textAreaChat} id = 'textArea' rows='10' cols='70'/>
        </div>
        </>
    )
}

export default Game;
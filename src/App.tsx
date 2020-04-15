import React, { useState } from 'react';
import Board from "./components/Board";
import Setup from "./components/Setup";
import Player from "./models/Player";
import './App.css';

const App = () => {
    const [ player, setPlayer ] = useState<Player>( new Player( ['1', '2']) );
    
    const endTurn = () => {
        setPlayer( player.getNext() );
    }

    return (
        <div>
            { player ? (
                <React.Fragment>
                  <div>{player.name }</div>
                  <Board player={ player } endTurn={ endTurn } />
                </React.Fragment>
            ) : (
                <Setup done={ setPlayer } />
            ) }
        </div>
    );
}

export default App;



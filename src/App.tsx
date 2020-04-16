import React, { useState } from 'react';
import Board from "./components/Board";
import Setup from "./components/Setup";
import Player from "./models/Player";
import './App.css';

const App = () => {
    const [ player, setPlayer ] = useState<Player>( new Player( [ "Player one", "Player two" ] ) );
    
    const endTurn = () => {
        if ( !player.isWinner() ) { 
            setPlayer( player.getNext() );
        }
    }

    return (
        <div>
            { player ? (
                <React.Fragment>
                  <div>{ player.name } { player.isWinner() && "Winner" }</div>
                  <Board player={ player } endTurn={ endTurn } />
                </React.Fragment>
            ) : (
                <Setup done={ setPlayer } />
            ) }
        </div>
    );
}

export default App;



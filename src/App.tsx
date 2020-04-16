import React, { useState } from 'react';
import Board from "./components/Board";
import Setup from "./components/Setup";
import Player from "./models/Player";
import './App.css';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
    const [ player, setPlayer ] = useState<Player>();
    
    const addScoreToScoreboard = ( name?: string, score?: number ) => {
        let scores = JSON.parse(localStorage.getItem( "ttt-scores" ) || "[]");
        scores = [ ...scores, { name, score } ];
        scores = scores.sort( ( a: any, b: any ) => a.score > b.score ? -1 : 1);
        scores = scores.slice( 0, 10 );
        localStorage.setItem( "ttt-scores", JSON.stringify(scores) );
    }
    
    const endTurn = () => {
        if ( player && !player.isWinner() ) { 
            setPlayer( player.endTurn() );
        } else if (player) {
            addScoreToScoreboard( player.name, player.getScore() );
            setPlayer( undefined );
        }
    }

    return (
        <React.Fragment>
            <ScoreBoard />
            { player ? (
                <Board player={ player } endTurn={ endTurn } />
            ) : (
                <Setup done={ setPlayer } />
            ) }
        </React.Fragment>
    );
}

export default App;



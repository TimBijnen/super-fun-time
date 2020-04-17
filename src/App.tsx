import React, { useState } from 'react';
import Board from "./components/Board";
import Setup from "./components/Setup";
import Player from "./models/Player";
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import GameResult from './components/GameResult';

const App = () => {
    const [ gameFinished, setGameFinished ] = useState( false );
    const [ player, setPlayer ] = useState<Player>();
    
    const addScoreToScoreboard = ( name?: string, score?: number ) => {
        let scores = JSON.parse(localStorage.getItem( "ttt-scores" ) || "[]");
        scores = [ ...scores, { name, score } ];
        scores = scores.sort( ( a: any, b: any ) => a.score > b.score ? -1 : 1);
        scores = scores.slice( 0, 10 );
        localStorage.setItem( "ttt-scores", JSON.stringify(scores) );
    }
    
    const endTurn = ( canMakeMove: boolean = true ) => {
        player && player.endTurn();
        if ( player && !player.isWinner() ) { 
            // Player did not win
            if ( canMakeMove ) {
                // There are still unfilled fields, end players turn.
                const next = player.getNext();
                next.startTurn();
                setPlayer( next );
            } else {
                // All fields have been filled, end game in draw.
                setGameFinished( true );
            }
        } else if (player) {
            // Player won
            addScoreToScoreboard( player.name, player.getScore() );
            setGameFinished( true );
        }
    }

    const newGame = () => {
        setGameFinished( false );
        setPlayer( undefined );
    }

    return (
        <React.Fragment>
            <ScoreBoard player={ player } />
            { player ? (
                <React.Fragment>
                    <Board player={ player } endTurn={ endTurn } />
                    { gameFinished && <GameResult player={ player } done={ newGame } />}
                </React.Fragment>
            ) : (
                <Setup done={ setPlayer } />
            ) }
        </React.Fragment>
    );
}

export default App;



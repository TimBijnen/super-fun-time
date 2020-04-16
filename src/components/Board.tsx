import React, { useState } from "react";
import Timer from "../components/Timer";
import Player from "../models/Player";
import { MARKERS } from "../enums";
import ScoreBoard from "./ScoreBoard";

export const EMPTY_BOARD: MARKERS[] = new Array( 9 ).fill( MARKERS.EMPTY );

const VICTORIES = "XXX......|...XXX...|......XXX|X...X...X|..X.X.X..|X..X..X..|.X..X..X.|..X..X..X";
  
type Board = {
    player: Player;
    endTurn: () => void;
}

export default ( { player, endTurn }: Board ): React.ReactElement => {
    const [ game, setGame ] = useState<MARKERS[]>( EMPTY_BOARD );

    const validateGame = ( game: MARKERS[] ) => {
        const match = new RegExp( VICTORIES.replace( /X/g, player.marker ), "g" );
        player.setWinner( !!game.join( "" ).match( match ) );
    };

    const updateGame = ( index: number ) => {
        const nextGame = game.map( ( v: MARKERS, i: number ) => i === index ? player.marker : v )
        validateGame( nextGame );
        setGame( nextGame );
        endTurn();
    };

    return (
        <div className="card ttt-wrapper">
            <div className="card-header ttt-header">
                <h3>{ player.getNext().name } make your move</h3>
            </div>
            <div className="card-body">
                <div className="ttt-board">
                    { game.map( ( field, i ) => (
                        <div
                            className={ `ttt-field marker-${ field }` }
                            onClick={ () => field === MARKERS.EMPTY && updateGame( i ) }
                        >
                            { field }
                        </div>
                    ) ) }
                </div>
            </div>
        </div>
    );
}
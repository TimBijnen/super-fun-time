import React, { useState } from "react";
import Player from "../models/Player";
import { MARKERS } from "../enums";

export const EMPTY_BOARD: MARKERS[] = new Array( 9 ).fill( MARKERS.EMPTY );

type Field = {
    value: MARKERS;
    selectField: () => void;
}

const TttField = ( { value, selectField }: Field ): React.ReactElement => {
    return (
      <div className="ttt-field" onClick={ selectField }>
        { value }
      </div>
    );
}



  
type Board = {
    player: Player;
    endTurn: () => void;
}

export default ( { player, endTurn }: Board ): React.ReactElement => {
    const [ game, setGame ] = useState<MARKERS[]>( EMPTY_BOARD );

    const updateGame = ( index: number ) => { 
        setGame( game.map( ( v: MARKERS, i: number ) => i === index ? player.marker : v ) );
        endTurn();
    }

    return (
        <div className="ttt-board">
            { game.map( ( g, i ) => <TttField value={ g } selectField={ () => g === MARKERS.EMPTY && updateGame( i ) } /> ) }
        </div>
    );
}
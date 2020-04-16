import React from "react";
import Player from "../models/Player";


export default ( { player }: any ) => {
    let scores = JSON.parse(localStorage.getItem( "ttt-scores" ) || "[]");
    if ( player.isWinner() ) {
        scores = [ ...scores, { name: player.name, score: player.getScore() } ];
        scores = scores.sort( ( a: any, b: any ) => a.score > b.score ? -1 : 1);
        scores = scores.slice( 0, 10 );
        localStorage.setItem( "ttt-scores", JSON.stringify(scores) );
    }
    return (
        <div>
            CURRENT SCORE: { player.getScore() }
            <br />
            {
                scores.map( ( highscore: any ) => (
                    <div>
                        { highscore.name }
                        { highscore.score }
                    </div>
                ) )
            }
        </div>
    );
}
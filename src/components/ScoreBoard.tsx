import React from "react";

export default ( { player }: any ) => {
    let scores = JSON.parse(localStorage.getItem( "ttt-scores" ) || "[]");

    return (
        <div className="card scoreboard">
            <div className="card-header"><h3>Scoreboard</h3></div>
            <div className="card-body">
                <ul>
                    {
                        scores.map( ( highscore: any ) => (
                            <li className="score-li">
                                <h3>{ highscore.name }</h3>
                                <h6>{ highscore.score }</h6>
                            </li>
                        ) )
                    }
                </ul>
            </div>
            <div className="card-footer">{ player && `Current score:  ${ player.getScore() }` }</div>
        </div>
    );
}
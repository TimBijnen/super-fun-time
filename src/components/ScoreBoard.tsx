import React from "react";

export default ( { player }: any ) => {
    let scores = JSON.parse(localStorage.getItem( "ttt-scores" ) || "[]");

    return (
        <div className="card scoreboard">
            <div className="card-header"><h3>Scoreboard</h3></div>
            <div className="card-body">
                <ul>
                    {
                        scores.map( ( highscore: any, index: number ) => (
                            <li className="score-li">
                                <h3>{ highscore.name }</h3>
                                <h6>{ highscore.score }</h6>
                            </li>
                        ) )
                    }
                </ul>
            </div>
            <div className="card-footer">
                {
                    player && (
                        <div>
                            <div className={ player === player.getNext( 0 ) ? "score-active" : ""}>
                                { `${ player.getNext( 0 ).name }. Your score is: ${ player.getNext( 0 ).getScore() }` }
                            </div>
                            <div className={ player === player.getNext( 1 ) ? "score-active" : ""}>
                                { `${ player.getNext( 1 ).name }. Your score is: ${ player.getNext( 1 ).getScore() }` }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
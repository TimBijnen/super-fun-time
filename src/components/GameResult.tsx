import React from "react";
import Player from "../models/Player";
import { formatTime } from "./Timer";

type GameResult = {
    player: Player;
    done: () => void; 
}
export default ( { player, done }: GameResult ) => {
    return (
        <div className="overlay root">
            <div className="card overlay-card">
                <div className="card-header">
                    <h3>Game Finished</h3>
                </div>
                <div className="card-body">
                    { player.isWinner() ? (
                        <React.Fragment>
                            Winning player: { player.name }<br />
                            Amount of moves: { player.moves.length }<br />
                            Time spent: { formatTime( player.timeSpent ) }
                        </React.Fragment>
                    ) : "Draw"}
                </div>
                <div className="card-footer">
                    <button onClick={ done }>
                        New game
                    </button>
                </div>
            </div>
        </div>
    );
}
import React from "react";
import Player from "../models/Player";

const player = new Player( [ "Remy", "Tim" ] );

export default ( { done }: any ) => (
    <div>
        SELECT PLAYER
        <button onClick={ () => done( player ) } />
        <br />
        CHOOSE WEAPON
        <div>X</div><div>O</div>
    </div>
)
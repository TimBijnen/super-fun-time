import React, { useState } from "react";
import Player from "../models/Player";



export default ( { done }: any ) => {
    const [ players, setPlayers ] = useState<string[]>( [] );
    const [ name, setName ] = useState( "" );

    return (
        <div className="card setup">
            <div className="card-header">
                <h3>
                    Start new game
                </h3>
            </div>
            <div className="card-body">
                <input value={ name } onChange={ e => setName( e.target.value ) } />
                <button disabled={ name === "" } onClick={ () => {
                    setPlayers( [ ...players, name ] );
                    setName( "" );
                } }>
                    Create player
                </button>
                { players.map( p => <div key={ p }>{ p }</div>)}
            </div>

            <div className="card-footer">
                <button disabled={ players.length < 1 } onClick={ () => done( new Player( players ) ) }>
                    Start game
                </button>
            </div>
        </div>
    )
}
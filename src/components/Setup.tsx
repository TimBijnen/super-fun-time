import React, { useState } from "react";
import Player from "../models/Player";

export default ( { done }: any ) => {
    const [ names, setNames ] = useState<string[]>( [ "", "" ] );
    const isValid = names.filter( ( n ) => n !== "" ).length === 2 && names[ 0 ] !== names[ 1 ];
    const onClick = () => isValid && done( new Player( names ) );

    return (
        <div className="card setup">
            <div className="card-header">
                <h3>Start new game</h3>
            </div>
            <div className="card-body setup-inputs">
                <input value={ names[ 0 ] } onChange={ e => setNames( [ e.target.value, names[ 1 ] ] ) } />
                <div className="setup-buttongroup" onClick={ onClick }>
                    <div className={ `setup-button ${ !isValid && "disabled" }` }>
                        VS
                    </div>
                    <span className="setup-span">
                        <p>
                            { isValid && "Click to start game" }
                        </p>
                    </span>
                </div>
                <input value={ names[ 1 ] } onChange={ e => setNames( [ names[ 0 ], e.target.value ] ) } />
            </div>
        </div>
    )
}
import React, { useState, useEffect, useCallback } from "react";

export const formatTime = ( t: number ) => {
    const minutes = Math.floor( t / 60 );
    const seconds = t % 60;
    if ( seconds < 10 ) {
        return `${ minutes }:0${ seconds.toFixed(1) }`;
    }
    return `${ minutes }:${ seconds.toFixed(1) }`;
}

export default ( { player }: any ) => {
    const [ time, setTime ] = useState<{ start?: number, timeExpired: number, end?: number }>( {
        start: Date.now(),
        timeExpired: 0,
    } );

    const startTimer = useCallback( () => setInterval( () => {
        time.start && setTime( { ...time, timeExpired: (Date.now() - time.start) / 1000 } );
    }, 50 ), [ time] );

    useEffect( () => {
        const timer = startTimer();
        return () => clearTimeout( timer );
    }, [ startTimer ] )

    return (
        <div className="timer">
            <div className="timer-players">
                <div className={ player === player.getNext( 0 ) ? "player-time-active" : ""}>
                    <div>{ player.getNext( 0 ).name }</div>
                    <div>
                        { formatTime( player.getNext( 0 ).timeSpent ) }
                    </div>
                    <div>{ player.getNext( 0 ).moves.length }</div>
                </div>
                <div className="timer-time">
                    { formatTime( time.timeExpired ) }
                </div>
                <div className={ player === player.getNext( 1 ) ? "player-time-active" : ""}>
                    <div>{ player.getNext( 1 ).name }</div>
                    <div>
                        { formatTime( player.getNext( 1 ).timeSpent ) }
                    </div>
                    <div>{ player.getNext( 1 ).moves.length }</div>
                </div>
            </div>
            <div className={ `timer-slider ${ player === player.getNext( 0 ) ? "left" : "right" }`} />
        </div>
    );
};
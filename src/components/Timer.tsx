import React, { useState, useEffect, useCallback } from "react";

export default ( { player }: any ) => {
    const [ time, setTime ] = useState<{ start?: number, timeExpired: number, end?: number }>( {
        start: Date.now(),
        timeExpired: 0,
    } );

    const startTimer = useCallback( () => {
        return setInterval( () => {
            if ( time.start ) {
                setTime( { ...time, timeExpired: (Date.now() - time.start) / 1000 } );
            }
        }, 50 );
    }, [ time ] );

    useEffect( () => {
        const timer = startTimer();
        return () => clearTimeout( timer );
    }, [ startTimer ] )

    return (
        <div className="timer">
            TIMER { time.timeExpired }
        </div>
    );
};
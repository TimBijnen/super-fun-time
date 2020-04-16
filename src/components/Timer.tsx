import React, { useState, useEffect } from "react";

export default ( { player }: any ) => {
    const [ time, setTime ] = useState<{ start?: number, timeExpired: number, end?: number }>( {
        start: Date.now(),
        timeExpired: 0,
    } );

    useEffect( () => {
        const cb = () => {
            setTimeout( () => {
                if ( time.start ) {
                    setTime( { timeExpired: (Date.now() - time.start) / 1000 } );
                    cb();
                }
            }, 1000 );
        }
        cb();
    }, [ time ] )
    // const 
    return (
        <div>
            TIMER { time.timeExpired }
        </div>
    );
};
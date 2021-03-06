import { MARKERS, MARKERS_VALUES } from "../enums";

const DEFAULT_PLAYERS = [ "Player one", "Player two" ];
const BASE_SCORE = 1000;

export default class Player {
    private next: Player;
    private winner: boolean = false;
    public moves: any = [];
    private index: number = 0;
    public turnStartTime: number = Date.now();
    public timeSpent: number = 0;
    public name?: string;
    public marker: MARKERS = MARKERS.X; 
    
    // Recursively create players and link them via a next property. Every player only 
    // knows about the next player.
    constructor( players: any[] = DEFAULT_PLAYERS, index: number = 0, first: Player | null = null ) {
        this.next = this;
        this.index = index;
        this.marker = MARKERS_VALUES[ index ];

        const player = players.shift();
        if ( player) {
            this.name = player;

            if ( players.length > 0 ) {
                if ( !first ) {
                    // This is the first player created, it passes itself as a reference
                    // for the last created player.
                    this.setNext( new Player( players, index + 1, this ) );
                } else {
                    // Any other player passes the first created player until the last player
                    // is created.
                    this.setNext( new Player( players, index + 1, first ) );
                }
            } else if ( first ) {
                // This is the last player created it sets its next property to the
                // first created player.
                this.setNext( first );
            }
        }
    }

    public getScore() {
        return Math.round( BASE_SCORE / ( this.moves.length + 1 ) - this.timeSpent );
    }

    public startTurn() {
        this.turnStartTime = Date.now();
    }
    
    public endTurn() {
        const start = this.turnStartTime;
        const end = Date.now();
        this.timeSpent += (end - start) / 1000;
        this.moves = [ ...this.moves, { start, end } ];
        // this.next.startTurn();
        // return this.next;
    }

    public getNext = ( index?: number ): Player => {
        if ( !index && index !== 0 ) {
            return this.next;
        }
        let next = this.next;
        while ( next.index !== index ) {
            next = next.next;
        }
        return next;
    };
    private setNext( p: Player ): void {
        this.next = p;
    }

    public isWinner = (): boolean => this.winner;
    public setWinner( w: boolean ): void {
        this.winner = w;
    }
};
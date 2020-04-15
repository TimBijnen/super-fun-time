import { MARKERS } from "../enums";

export default class Player {
    private next: Player;
    public name?: string;
    public marker: MARKERS = MARKERS.X; 
    
    // Recursively create players and link them via a next property. Every player only 
    // knows about the next player.
    constructor( names: string[], first: Player | null = null ) {
        this.next = this;
        
        const name = names.shift();
        if ( name ) {
            this.name = name;

            if ( names.length > 0 ) {
                if ( !first ) {
                    // This is the first player created, it passes itself as a reference
                    // for the last created player.
                    this.setNext( new Player( names, this ) );
                } else {
                    // Any other player passes the first created player until the last player
                    // is created.
                    this.setNext( new Player( names, first ) );
                }
            } else if ( first ) {
                // This is the last player created it sets its next property to the
                // first created player.
                this.setNext( first );
            }
        }
    }

    public getNext = (): Player => this.next;
    private setNext( p: Player ): void {
      this.next = p;
    }
};
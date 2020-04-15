import Player from './Player';

test('Can create players', () => {
    const player = new Player( [ "Player one", "Player two" ] );
    expect( player.name ).toBe( "Player one" );
    expect( player.next.name ).toBe( "Player two" );
} );

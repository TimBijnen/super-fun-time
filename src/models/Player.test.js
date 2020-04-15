import Player from './Player';

test('Can create players default players', () => {
    const player = new Player();
    expect( player.name ).toBe( "Player one" );
    expect( player.next.name ).toBe( "Player two" );
} );

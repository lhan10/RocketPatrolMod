// CMPM/ARTG 120 assignment Rocket Patrol Mod
// Game Name: Happy Foodie
// creator: Ligen Han
// points breakdown: 
//                     Add your own (copyright-free) background music to the Play scene (5)
//                     Allow the player to control the Rocket after it's fired (5)
//                     Implement the speed increase that happens after 30 seconds in the original game (5)
//                     Display the time remaining (in seconds) on the screen (10)
//                     Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//                     Implement a simultaneous two-player mode (30)
//                     Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)



// game configuration
let config = {
   type: Phaser.CANVAS,
   width: 640,
   height: 480,
   scene: [ Menu, Menu2, Menu3, Play, Play2 ] 
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve key bindings
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyS, keySPACE;


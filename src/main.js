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


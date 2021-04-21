class Menu2 extends Phaser.Scene{
    constructor(){
        super("menuScene2");
    }
    
    create(){
    // white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin
    (0,0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
    borderUISize, 0xFFFFFF).setOrigin(0,0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin
    (0,0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.
    config.height, 0xFFFFFF).setOrigin(0,0);

    let menuConfig = {
        fontFamily: 'emoji',
        fontSize: '20px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 0
    }
        
    this.add.text(game.config.width/2, game.config.height/2, 'Use ↔ arrows to move & ↑ to release',
    menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height*(2/3), 'Press Space to Start',
    menuConfig).setOrigin(0.5);

    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            // one player mode
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
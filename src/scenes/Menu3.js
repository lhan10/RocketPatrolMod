class Menu3 extends Phaser.Scene{
    constructor(){
        super("menuScene3");
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
        fontSize: '16px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 0
    }

    let menuConfig2 = {
        fontFamily: 'emoji',
        fontSize: '18px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 0
    }
    
    this.add.text(game.config.width/2, game.config.height/2, 'Player 1 Uses ↔ Arrows to Move & ↑ to Release', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + borderPadding*4, 'Player 2 Uses keyboard "A" and "S" to Move & "F" to Release', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height*(3/4), 'Press Space to Start', menuConfig2).setOrigin(0.5);

    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //two players mode
            this.sound.play('sfx_select');
            this.scene.start('playScene2');
        }
    }
}
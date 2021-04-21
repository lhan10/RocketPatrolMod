class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/beep.mp3');
        this.load.audio('sfx_happy', './assets/happy.wav');
        this.load.audio('sfx_release', './assets/release.mp3');
        this.load.image('foodie','./assets/foodie.jpg')
    }

    create() {
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
            fontSize: '32px',
            backgroundColor: '#F34141',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - 
        borderPadding, 'Happy Foodie', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        menuConfig.fontSize = '20px';
        this.add.image(game.config.width/2, game.config.height/2,
        'foodie').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height*(3/4) + borderUISize + borderPadding,
        'Press ← for Single Player or → for Two Players', menuConfig).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //single player mode
            game.settings ={
                spaceshipSpeed: 4,
                gameTimer: 50000
            }
            this.sound.play('sfx_select');
            this.scene.start('menuScene2');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // two players mode
            game.settings ={
                spaceshipSpeed: 5,
                gameTimer: 70000
            }
            this.sound.play('sfx_select');
            this.scene.start('menuScene3');
        }
    }
}
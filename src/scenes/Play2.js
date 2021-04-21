class Play2 extends Phaser.Scene{
    constructor(){
        super("playScene2");
    }
    
    preload(){
        // load images/tile sprites
        this.load.image('hand', './assets/hand.png');
        this.load.image('food1', './assets/food1.png');
        this.load.image('food2', './assets/food2.png')
        this.load.image('food3', './assets/food3.png')
        this.load.image('menu', './assets/menu.jpg');
        this.load.audio('background', './assets/background.mp3');

        // load spritesheet
        this.load.spritesheet('gotcha', './assets/sprite.png', {
            frameWidth: 64,
            frameHeighr: 32,
            startFrame: 0,
            endFrame: 15
        });
    }
    
    create() {
        
        this.background = game.sound.add('background');
        this.background.loop = true;
        this.background.play();
        
        // place startfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'menu').setOrigin(0,0);



        // add rockets (player 1 and 2)
        this.p1Rocket = new Rocket(this, game.config.width/4, game.config.height -
        borderUISize - borderPadding, 'hand').setOrigin(0.5,0);
        this.p2Rocket = new Rocket2(this, game.config.width*(3/4), game.config.height -
        borderUISize - borderPadding, 'hand').setOrigin(0.5,0);

        // add spaceship (x3)
        this.food01 = new Spaceship2(this, game.config.width + borderUISize*6, borderUISize*4,
        'food1', 0, 50).setOrigin(0, 0);
        this.food02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 +
        borderPadding*2, 'food2', 0, 20).setOrigin(0, 0);
        this.food03 = new Spaceship(this, game.config.width, borderUISize*6 + borderUISize*4,
        'food3', 0, 10).setOrigin(0, 0);
        

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('gotcha', {
                start: 0,
                end: 15,
                first: 0
            }),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;


        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '12px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize/5, this.p1Score, scoreConfig);
        this.scoreLeft1 = this.add.text(game.config.height + borderPadding, borderUISize/5, this.p2Score, scoreConfig);

        
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '12px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.add.text((game.config.height + borderPadding)/2, borderUISize/5, 'Time Left:', timeConfig);
        
        timeConfig.align = 'right';

        this.timeLeft= this.add.text((game.config.height + borderPadding*15)/2, borderUISize/5, this.timeL, timeConfig);

        this.timeL = game.settings.gameTimer / 1000;


        // GAME OVER flag
        this.gameOver = false;


        let scoreConfig1 = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            scoreConfig1).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64,
            'Press (R) to Restart or ←	for Menu', scoreConfig1).setOrigin(0.5);
            this.gameOver = true;
            }, null, this);


            this.clock2 = this.time.delayedCall(30000, () => {
                game.settings.spaceshipSpeed += 3;
            }, null, this);
    }

        

    update() {

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver){
        this.p1Rocket.update();
        this.p2Rocket.update();  //update rocket
        this.food01.update();  //update spaceships (x3)
        this.food02.update();
        this.food03.update();
        this.timeL = Math.floor(game.settings.gameTimer/1000 - this.clock.getElapsed()/1000);
        this.timeLeft.text = this.timeL;
        }
        
        // check collisions
        if(this.checkCollison(this.p1Rocket, this.food03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.food03);
        }
        if(this.checkCollison(this.p1Rocket, this.food02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.food02);
        }
        if(this.checkCollison(this.p1Rocket, this.food01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.food01);
        }

        if(this.checkCollison1(this.p2Rocket, this.food03)) {
            this.p2Rocket.reset();
            this.shipExplode1(this.food03);
        }
        if(this.checkCollison1(this.p2Rocket, this.food02)) {
            this.p2Rocket.reset();
            this.shipExplode1(this.food02);
        }
        if(this.checkCollison1(this.p2Rocket, this.food01)) {
            this.p2Rocket.reset();
            this.shipExplode1(this.food01);
        }
    }

    checkCollison(rocket, food) {
        //  simple AABB checking
        if( rocket.x < food.x + food.width &&
            rocket.x + rocket.width > food.x &&
            rocket.y < food.y + food.height &&
            rocket.y + rocket.height > food.y) {
                return true;
        }   else {
            return false;
        }
    }

    checkCollison1(rocket, food) {
        //  simple AABB checking
        if( rocket.x < food.x + food.width &&
            rocket.x + rocket.width > food.x &&
            rocket.y < food.y + food.height &&
            rocket.y + rocket.height > food.y) {
                return true;
        }   else {
            return false;
        }
    }

    shipExplode(food) {
        // temporarily hide ship
        food.alpha = 0;
        // create explosion sprite at ship's explosion
        let boom = this.add.sprite(food.x, food.y, 'gotcha').setOrigin(0, 0);
        boom.anims.play('explode');             //play explode animation
        boom.on('animationcomplete', () => {    //callback after anim completes
            food.reset();                       //reset ship position
            food.alpha = 1;                     //make ship visiable again
            boom.destroy();                     //remove explosion sprite
        });
        // score add and repaint
        this.p1Score += food.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_happy');
    }

    shipExplode1(food) {
        // temporarily hide ship
        food.alpha = 0;
        // create explosion sprite at ship's explosion
        let boom = this.add.sprite(food.x, food.y, 'gotcha').setOrigin(0, 0);
        boom.anims.play('explode');             //play explode animation
        boom.on('animationcomplete', () => {    //callback after anim completes
            food.reset();                       //reset ship position
            food.alpha = 1;                     //make ship visiable again
            boom.destroy();                     //remove explosion sprite
        });
        // score add and repaint
        this.p2Score += food.points;
        this.scoreLeft1.text = this.p2Score;
        this.sound.play('sfx_happy');
    }
    
    calculateTotalValue() {
        this.minutes = game.settings.gameTimer / 1000 -1,
        this.minutes -= 1;
        this.timeLeft.text = this.minutes;       
    }

}
var score = 0;
var scoreText;
var game = null;
var platforms;
var player;
var stars;
var bombs;
var cursors;
var gameOver;

// callbacks for React
export var gameCallbacks = {
    onStarCollected: null,
    onGameOver: null,
};
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container", // (tells Phaser to mount inside the div with id="game-container")
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
export function startGame() {
    score = 0;
    gameOver = false;
    if (game) {
        game.destroy(true);
    }
    game = new Phaser.Game(config);
    return game;
}

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
    });
}

function create() {
    // this doesn't resszie , the image stays as it's , but it's now centered
    // this.add.image(game_screen_w/2,game_screen_h/2,'sky')
    //this.add.image(400,300,'sky')
    // to insure things appear as you want them
    // make sure you define what is in the background first
    // then go to the next item that is above it
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(600, 400, "ground");

    platforms.create(50, 100, "ground");

    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    //creating the player

    player = this.physics.add.sprite(100, 450, "dude");

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //-1 to tell the animations to loop
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", {
            start: 0,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", {
            start: 5,
            end: 8,
        }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
    });

    // simulating the  the effects of gravity on a sprite, it's as simple as writing:
    //player.body.setGravityY(300);

    this.physics.add.collider(player, platforms);

    stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
    });

    //a random bounce value between 0.4,0.8

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    scoreText = this.add.text(16, 16, "Score:0", {
        fontSize: "32px",
        fill: "#000",
    });
}

function update() {
    cursors = this.input.keyboard.createCursorKeys();
    //   pointer = this.input.activePointer;

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);

        player.anims.play("turn");
    }

    //if (cursors.up.isDown && player.body.touching.down) {
    //  player.setVelocityY(-330);
    // }

    if (cursors.up.isDown || cursors.space.isDown) {
        player.setVelocityY(-330);
    }

    // this is an important code for my game for QNAR
    this.input.on(
        "pointerdown",

        // This function runs
        //when a mouse button is clicked or the screen is touched.
        function (pointer) {
            if (pointer.isDown) {
                player.setVelocityY(-170);
            }
        },
        this
    );

    if (cursors.down.isDown) {
        player.setVelocityY(300);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    this.physics.pause();

    // Call React to show question
    if (gameCallbacks.onStarCollected) {
        gameCallbacks.onStarCollected(this);
    }

    score += 10;
    scoreText.setText("Score: " + score);

    // count active will give us weather the stars all of them have been collected or not
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;

    if (gameCallbacks.onGameOver) {
        gameCallbacks.onGameOver(score);
    }
}
export function resumeGame(scene, isCorrect) {
    if (isCorrect) {
        score += 10;
        scoreText.setText("Score: " + score);
        scene.physics.resume();

        // Check if all stars collected
        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    } else {
        // Wrong answer = game over
        gameOver = true;
        scoreText.setText("Game Over! Final Score: " + score);
        if (gameCallbacks.onGameOver) {
            gameCallbacks.onGameOver(score);
        }
    }
}

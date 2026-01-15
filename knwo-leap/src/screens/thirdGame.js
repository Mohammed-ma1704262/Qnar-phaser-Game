var score = 0;
var scoreText;
var game = null;
var player;
var rings;
var challengeRings;
var pipes;
var bombs;
var cursors;
var gameOver;
var isImmune = false;
var immuneTimer = 0;
var normalSpeed = 200;
var boostedSpeed = 600;
var pipeSpeed = normalSpeed;
var spawnTimers = [];

// callbacks for React
export var gameCallbacks = {
    onChallengeRingPassed: null,
    onGameOver: null,
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
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
    isImmune = false;
    immuneTimer = 0;
    pipeSpeed = normalSpeed;
    spawnTimers = [];
    if (game) {
        game.destroy(true);
    }
    game = new Phaser.Game(config);
    return game;
}

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("down_pipe", "assets/down_pipe.png");
    this.load.image("up_pipe", "assets/up_pipe.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("ring", "assets/s_ring.png", {
        frameWidth: 318,
        frameHeight: 216,
    });
    this.load.spritesheet("bird", "assets/bird2.png", {
        frameWidth: 266,
        frameHeight: 278,
    });
}

function create() {
    // Background
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    // Ground platforms (top and bottom)
    var platforms = this.physics.add.staticGroup();
    platforms.create(400, 620, "ground").setScale(2).refreshBody();
    platforms.create(400, -20, "ground").setScale(2).refreshBody();

    // Player
    player = this.physics.add.sprite(100, 300, "bird");
    player.setScale(0.25, 0.25);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Animations
    this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "idle",
        frames: [{ key: "bird", frame: 1 }],
        frameRate: 20,
    });

    this.physics.add.collider(player, platforms, hitObstacle, null, this);

    // Pipes group
    pipes = this.physics.add.group();

    // Small collectible rings
    rings = this.physics.add.group();

    // Challenge rings (red tinted)
    challengeRings = this.physics.add.group();

    // Bombs
    bombs = this.physics.add.group();

    // Colliders
    this.physics.add.overlap(player, rings, collectRing, null, this);
    this.physics.add.overlap(
        player,
        challengeRings,
        passChallengeRing,
        null,
        this
    );
    this.physics.add.collider(player, pipes, hitObstacle, null, this);
    this.physics.add.collider(player, bombs, hitObstacle, null, this);

    // Score
    scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "32px",
        fill: "#fff",
    });

    // Start spawning - store timers so we can pause them
    spawnTimers.push(
        this.time.addEvent({
            delay: 2000,
            callback: spawnPipes,
            callbackScope: this,
            loop: true,
        })
    );

    spawnTimers.push(
        this.time.addEvent({
            delay: 3000,
            callback: spawnRings,
            callbackScope: this,
            loop: true,
        })
    );

    spawnTimers.push(
        this.time.addEvent({
            delay: 8000,
            callback: spawnChallengeRing,
            callbackScope: this,
            loop: true,
        })
    );

    spawnTimers.push(
        this.time.addEvent({
            delay: 10000,
            callback: spawnBomb,
            callbackScope: this,
            loop: true,
        })
    );

    player.play("fly");
}

function update(time, delta) {
    if (gameOver) return;

    // IMPORTANT FIX: Only update game elements when physics is NOT paused
    if (!this.physics.world.isPaused) {
        cursors = this.input.keyboard.createCursorKeys();

        let velo = -170;
        // Flap controls
        if (
            Phaser.Input.Keyboard.JustDown(cursors.up) ||
            Phaser.Input.Keyboard.JustDown(cursors.space)
        ) {
            player.setVelocityY(velo);
        }

        this.input.on(
            "pointerdown",
            function (pointer) {
                if (!gameOver) {
                    player.setVelocityY(velo);
                }
            },
            this
        );

        // Move pipes, rings, and bombs
        pipes.children.entries.forEach((pipe) => {
            pipe.x -= (pipeSpeed * delta) / 1000;
            if (pipe.x < -100) pipe.destroy();
        });

        rings.children.entries.forEach((ring) => {
            ring.x -= (pipeSpeed * delta) / 1000;
            if (ring.x < -100) ring.destroy();
        });

        challengeRings.children.entries.forEach((ring) => {
            ring.x -= (pipeSpeed * delta) / 1000;
            if (ring.x < -100) ring.destroy();
        });

        bombs.children.entries.forEach((bomb) => {
            bomb.setScale(2);
            bomb.x -= (pipeSpeed * delta) / 1000;
            if (bomb.x < -100) bomb.destroy();
        });

        // Handle immunity timer
        if (isImmune) {
            immuneTimer -= delta;
            if (immuneTimer <= 0) {
                isImmune = false;
                pipeSpeed = normalSpeed;
                player.clearTint();
            }
        }
    }
}

function spawnPipes() {
    if (gameOver) return;

    var gap = 220;
    var gapCenter = Phaser.Math.Between(200, 400);

    // Top pipe (hangs down from top)
    var upPipe = pipes.create(850, gapCenter - gap / 2, "up_pipe");
    upPipe.setOrigin(0.5, 1);
    upPipe.setScale(0.4, 1);
    upPipe.body.allowGravity = false;
    upPipe.setImmovable(true);
    upPipe.refreshBody();

    // Bottom pipe (stands up from bottom)
    var downPipe = pipes.create(850, gapCenter + gap / 2, "down_pipe");
    downPipe.setOrigin(0.5, 0);
    downPipe.setScale(0.4, 1);
    downPipe.body.allowGravity = false;
    downPipe.setImmovable(true);
    downPipe.refreshBody();
}

function spawnRings() {
    if (gameOver) return;

    var y = Phaser.Math.Between(150, 450);
    var ring = rings.create(850, y, "ring");
    ring.setScale(0.15, 0.15);
    ring.body.allowGravity = false;

    this.anims.create({
        key: "ring_spin",
        frames: this.anims.generateFrameNumbers("ring", { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
    });
    ring.play("ring_spin");
}

function spawnChallengeRing() {
    if (gameOver) return;

    var y = 300;
    var challengeRing = challengeRings.create(850, y, "ring");
    challengeRing.setScale(0.3, 1);
    challengeRing.setTint(0x0ff000);
    challengeRing.body.allowGravity = false;
    challengeRing.hasPassed = false;

    challengeRing.play("ring_spin");
}

function spawnBomb() {
    if (gameOver) return;

    var y = Phaser.Math.Between(100, 500);
    var bomb = bombs.create(850, y, "bomb");
    bomb.setScale(0.5, 0.5);
    bomb.body.allowGravity = false;
    bomb.setVelocityY(Phaser.Math.Between(-100, 100));
}

function collectRing(player, ring) {
    ring.destroy();
    score += 5;
    scoreText.setText("Score: " + score);
}

function passChallengeRing(player, challengeRing) {
    if (challengeRing.hasPassed) return;

    challengeRing.hasPassed = true;
    this.physics.pause();

    // Pause all spawn timers
    spawnTimers.forEach((timer) => (timer.paused = true));

    if (gameCallbacks.onChallengeRingPassed) {
        gameCallbacks.onChallengeRingPassed(this);
    }
}

function hitObstacle(player, obstacle) {
    if (isImmune) return;

    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("idle");
    gameOver = true;

    if (gameCallbacks.onGameOver) {
        gameCallbacks.onGameOver(score);
    }
}

export function resumeGame(scene, isCorrect) {
    // Resume all spawn timers
    spawnTimers.forEach((timer) => (timer.paused = false));

    if (isCorrect === true) {
        score += 20;
        scoreText.setText("Score: " + score);

        // Grant immunity and speed boost
        isImmune = true;
        immuneTimer = 3000;
        pipeSpeed = boostedSpeed;
        player.setTint(0x00ff00);

        scene.physics.resume();
    } else {
        // Stun for 0.1 seconds
        scene.time.delayedCall(100, () => {
            scene.physics.resume();
        });
    }
}

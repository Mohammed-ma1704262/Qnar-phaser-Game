// var score = 0;
// var scoreText;
// var game = null;
// var platforms;
// var player;
// var rings;
// var bombs;
// var cursors;
// var gameOver;

// // // callbacks for React
// // export var gameCallbacks = {
// //     onringCollected: null,
// //     onGameOver: null,
// // };
// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: "game-container", // (tells Phaser to mount inside the div with id="game-container")
//     physics: {
//         default: "arcade",
//         arcade: {
//             gravity: { y: 300 },
//             debug: false,
//         },
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update,
//     },
// };

// var game = new Phaser.Game(config);

// function preload() {
//     this.load.image("sky", "../../public/assets/sky.png");
//     this.load.image("ground", "../../public/assets/platform.png");

//     this.load.image("down_pipe", "../../public/assets/down_pipe.png");
//     this.load.image("up_pipe", "../../public/assets/up_pipe.png");

//     this.load.image("bomb", "assets/bomb.png");

//     this.load.spritesheet("ring", "../../public/assets/s_ring.png", {
//         frameWidth: 318,
//         frameHeight: 216,
//     });
//     this.load.spritesheet("bird", "../../public/assets/bird2.png", {
//         frameWidth: 266,
//         frameHeight: 278,
//     });
// }

// function create() {
//     // this doesn't resszie , the image stays as it's , but it's now centered
//     // this.add.image(game_screen_w/2,game_screen_h/2,'sky')
//     //this.add.image(400,300,'sky')
//     // to insure things appear as you want them
//     // make sure you define what is in the background first
//     // then go to the next item that is above it
//     sky = this.add.image(0, 0, "sky").setOrigin(0, 0);

//     platforms = this.physics.add.staticGroup();

//     platforms.create(400, 620, "ground").setScale(2).refreshBody();

//     platforms.create(400, -20, "ground").setScale(2).refreshBody();
//     //creating the player

//     player = this.physics.add.sprite(100, 300, "bird");

//     player.setScale(0.25, 0.25); // Halves the size

//     up_pipe = this.physics.add.sprite(200, 150, "up_pipe");

//     down_pipe = this.physics.add.sprite(200, 600, "down_pipe");

//     down_pipe.setScale(0.3, 1.2); // Halves the size

//     up_pipe.setScale(0.3, 1.2); // Halves the size

//     player.setBounce(0.2);
//     player.setCollideWorldBounds(true);
//     //-1 to tell the animations to loop
//     this.anims.create({
//         key: "upMouse",
//         frames: [{ key: "bird", frame: 4 }],
//         frameRate: 30,
//     });
//     this.anims.create({
//         key: "upR",
//         frames: [{ key: "bird", frame: 4 }],
//         frameRate: 30,
//     });

//     this.anims.create({
//         key: "upL",
//         frames: [{ key: "bird", frame: 9 }],
//         frameRate: 30,
//     });

//     this.anims.create({
//         key: "left",
//         frames: this.anims.generateFrameNumbers("bird", {
//             start: 6,
//             end: 11,
//         }),
//         frameRate: 10,
//         repeat: -1,
//     });

//     this.anims.create({
//         key: "right",
//         frames: this.anims.generateFrameNumbers("bird", {
//             start: 0,
//             end: 5,
//         }),
//         frameRate: 10,
//         repeat: -1,
//     });

//     this.anims.create({
//         key: "idle",
//         frames: [{ key: "bird", frame: 1 }],
//         frameRate: 20,
//     });

//     // simulating the  the effects of gravity on a sprite, it's as simple as writing:
//     //player.body.setGravityY(300);

//     this.physics.add.collider(player, platforms);

//     rings = this.physics.add.group({
//         key: "ring",
//         repeat: 5,
//         setXY: { x: 12, y: 0, stepX: 140 },
//     });

//     this.anims.create({
//         key: "defualt_ring",
//         frames: this.anims.generateFrameNumbers("ring", {
//             start: 0,
//             end: 7,
//         }),
//         frameRate: 10,
//         repeat: -1,
//     });
//     //a random bounce value between 0.4,0.8

//     rings.children.iterate(function (child) {
//         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
//         child.setScale(0.5, 2);
//         child.play("defualt_ring");
//     });

//     this.physics.add.collider(rings, platforms);

//     this.physics.add.overlap(player, rings, collectring, null, this);

//     bombs = this.physics.add.group();

//     this.physics.add.collider(bombs, platforms);

//     this.physics.add.collider(player, bombs, hitBomb, null, this);

//     scoreText = this.add.text(16, 16, "Score:0", {
//         fontSize: "32px",
//         fill: "#000",
//     });

//     this.physics.pause();

//     player.play("right");
// }

// function update() {
//     if (this.isPaused) {
//         player.setVelocity(0, 0); // Stop movement
//         player.anims.play("right", true); // The 'true' argument ignores if it's already playing
//         return; // Stop the rest of the update function from running
//     }
//     cursors = this.input.keyboard.createCursorKeys();

//     let keyHit = false;
//     if (cursors.left.isDown) {
//         keyHit = true;
//         player.setVelocityX(-160);

//         player.anims.play("left", true);
//     } else if (cursors.right.isDown) {
//         keyHit = true;
//         player.setVelocityX(160);

//         player.anims.play("right", true);
//     } else {
//         player.setVelocityX(0);

//         if (player.body.velocity.y >= 0) {
//             player.anims.play("idle");
//         } else {
//             player.anims.play("upMouse");
//         }
//     }
//     // this is an important code for my game for QNAR

//     this.input.on(
//         "pointerdown",
//         function (pointer) {
//             this.physics.resume();
//             player.anims.play("upMouse");
//             player.setVelocityY(-170);
//         },
//         this
//     );

//     if (cursors.up.isDown || cursors.space.isDown) {
//         keyHit = true;
//         player.anims.play("upR", true);
//         player.setVelocityY(-330);
//     }

//     if ((cursors.up.isDown || cursors.space.isDown) && cursors.right.isDown) {
//         keyHit = true;
//         player.anims.play("upR", true);
//         player.setVelocityY(-330);
//     }

//     if ((cursors.up.isDown || cursors.space.isDown) && cursors.left.isDown) {
//         keyHit = true;
//         player.anims.play("upL", true);
//         player.setVelocityY(-330);
//     }

//     if (keyHit) {
//         this.physics.resume();
//     }

//     //if (cursors.up.isDown && player.body.touching.down) {
//     //  player.setVelocityY(-330);
//     // }

//     // this is an important code for my game for QNAR
// }

// function collectring(player, ring) {
//     ring.disableBody(true, true);

//     score += 10;
//     scoreText.setText("Score: " + score);

//     // count active will give us weather the rings all of them have been collected or not
//     if (rings.countActive(true) === 0) {
//         rings.children.iterate(function (child) {
//             child.enableBody(true, child.x, 0, true, true);
//         });

//         var x =
//             player.x < 400
//                 ? Phaser.Math.Between(400, 800)
//                 : Phaser.Math.Between(0, 400);

//         var bomb = bombs.create(x, 16, "bomb");
//         bomb.setBounce(1);
//         bomb.setCollideWorldBounds(true);
//         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//     }
// }

// function hitBomb(player, bomb) {
//     this.physics.pause();

//     player.setTint(0xff0000);

//     player.anims.play("idle");

//     gameOver = true;
// }

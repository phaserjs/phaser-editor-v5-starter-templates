
// You can write more code here

/* START OF COMPILED CODE */

import Player from "../prefabs/Player.js";
import UIText from "../prefabs/UIText.js";
/* START-USER-IMPORTS */
import Coin from "../prefabs/Coin.js";
import Spike from "../prefabs/Spike.js";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// backgroundLayer
		const backgroundLayer = this.add.layer();

		// background1
		const background1 = this.add.image(-8, 0, "background");
		background1.setOrigin(0, 0);
		backgroundLayer.add(background1);

		// background2
		const background2 = this.add.image(808, 0, "background");
		background2.setOrigin(0, 0);
		backgroundLayer.add(background2);

		// obstacleLayer
		const obstacleLayer = this.add.layer();

		// coinLayer
		const coinLayer = this.add.layer();

		// player
		const player = new Player(this, 400, 200, "bat", 2);
		this.add.existing(player);

		// uiLayer
		const uiLayer = this.add.layer();

		// tutorialText
		const tutorialText = new UIText(this, 400, 300);
		tutorialText.text = "Tap to fly!";
		tutorialText.setStyle({  });
		uiLayer.add(tutorialText);

		// scoreText
		const scoreText = new UIText(this, 400, 50);
		scoreText.text = "Score: 0";
		scoreText.setStyle({ "fontSize": "28px" });
		uiLayer.add(scoreText);

		// player_vs_spikes
		this.physics.add.overlap(player, obstacleLayer.list, this.hitObstacle, undefined, this);

		// player_vs_coins
		this.physics.add.overlap(player, coinLayer.list, this.collectCoin, undefined, this);

		this.background1 = background1;
		this.background2 = background2;
		this.obstacleLayer = obstacleLayer;
		this.coinLayer = coinLayer;
		this.player = player;
		this.tutorialText = tutorialText;
		this.scoreText = scoreText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	background1;
	/** @type {Phaser.GameObjects.Image} */
	background2;
	/** @type {Phaser.GameObjects.Layer} */
	obstacleLayer;
	/** @type {Phaser.GameObjects.Layer} */
	coinLayer;
	/** @type {Player} */
	player;
	/** @type {UIText} */
	tutorialText;
	/** @type {UIText} */
	scoreText;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.initVariables();
		this.initInput();
	}

	initVariables() {

		this.pathY;
		this.pathOffset = 0;
		this.pathOffsetTarget = 0;
		this.pathOffsetMax = 100;
		this.pathHeightTarget = 300;
		this.pathHeightMin = 50;
		this.pathHeightMax = 200;

		this.score = 0;
		this.distance = 0;
		this.distanceMax = 200;
		this.flyVelocity = -200;
		this.backgroundSpeed = 1;
		this.coinDistance = 0;
		this.coinDistanceMax = 50;
		this.spikeDistance = 0;
		this.spikeDistanceMax = 18;

		this.gameStarted = false;

		this.centreX = this.scale.width * 0.5;
		this.centreY = this.scale.height * 0.5;
		this.pathHeight = this.pathHeightMax;
	}

	initInput() {

		this.physics.pause();

		this.input.once("pointerdown", () => {

			this.startGame();
		});

		this.input.keyboard.once("keydown-SPACE", () => {

			this.startGame();
		});
	}

	startGame() {

		this.gameStarted = true;

		this.physics.resume();

		this.input.on("pointerdown", () => {

			this.fly();
		});

		this.input.keyboard.on("keydown-SPACE", () => {

			this.fly();
		});

		this.fly();

		this.tutorialText.setVisible(false);
	}

	fly() {

		this.player.setVelocityY(this.flyVelocity);
	}

	update() {

		// scroll background

		this.background1.x -= this.backgroundSpeed;
		this.background2.x -= this.backgroundSpeed;

		if (this.background1.x + this.background1.width < 0) {

			this.background1.x += (this.background1.width * 2);
		}

		if (this.background2.x + this.background2.width < 0) {

			this.background2.x += (this.background2.width * 2);
		}

		if (!this.gameStarted) {

			return;
		}

		this.distance += this.backgroundSpeed;
		this.coinDistance += this.backgroundSpeed;
		this.spikeDistance += this.backgroundSpeed;

		if (this.distance > this.distanceMax) {

			this.distance -= this.distanceMax;

			this.randomPath();
		}

		if (this.coinDistance > this.coinDistanceMax) {

			this.coinDistance -= this.coinDistanceMax;

			this.addCoin();
		}

		if (this.spikeDistance > this.spikeDistanceMax) {

			this.spikeDistance -= this.spikeDistanceMax;

			this.addSpike();
		}

		this.coinLayer.list.forEach((/** @type {Coin} */ coin) => {

			coin.x -= this.backgroundSpeed;
			coin.refreshBody();

		}, this);

		this.obstacleLayer.list.forEach((/** @type {Spike} */ spike) => {

			spike.x -= this.backgroundSpeed;
			spike.refreshBody();

		}, this);

		this.updatePath();
	}

	randomPath() {

		this.pathOffsetTarget = Phaser.Math.RND.between(-this.pathOffsetMax, this.pathOffsetMax);
		this.pathHeightTarget = Phaser.Math.RND.between(this.pathHeightMin, this.pathHeightMax);
	}

	updatePath() {

		const d1 = this.pathOffsetTarget - this.pathOffset;
		const d2 = this.pathHeightTarget - this.pathHeight;

		this.pathOffset += d1 * 0.01;
		this.pathHeight += d2 * 0.01;

		this.pathY = this.centreY + this.pathOffset;
	}

	addCoin() {

		const coin = new Coin(this, this.scale.width + 50, this.pathY);

		this.coinLayer.add(coin);
	}

	addSpike() {

		const spikeTop = new Spike(this, this.scale.width + 50, this.pathY - this.pathHeight);
		spikeTop.flipY = true;

		const spikeBottom = new Spike(this, this.scale.width + 50, this.pathY + this.pathHeight);

		this.obstacleLayer.add(spikeTop);
		this.obstacleLayer.add(spikeBottom);
	}

	/**
	 * 
	 * @param {Player} player 
	 * @param {Spike} obstacle 
	 */
	hitObstacle(player, obstacle) {

		this.gameStarted = false;
		this.physics.pause();

		this.tweens.add({
			targets: this.player,
			scale: 3,
			alpha: 0,
			duration: 1000,
			ease: Phaser.Math.Easing.Expo.Out
		});

		this.gameOver();
	}

	/**
	 * 
	 * @param {Player} player 
	 * @param {Coin} coin 
	 */
	collectCoin(player, coin) {

		coin.destroy(true);

		this.score++;
		this.scoreText.setText(`Score: ${this.score}`);
	}

	gameOver() {

		this.time.delayedCall(2000, () => {

			this.scene.start("GameOver");
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

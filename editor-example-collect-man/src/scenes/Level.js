
// You can write more code here

/* START OF COMPILED CODE */

import Bomb from "../prefabs/Bomb.js";
import Coin from "../prefabs/Coin.js";
import UIText from "../prefabs/UIText.js";
import Player from "../prefabs/Player.js";
/* START-USER-IMPORTS */
import Enemy from "../prefabs/Enemy.js";
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

		// editabletilemap
		this.cache.tilemap.add("editabletilemap_e6158e91-a687-48b5-9757-c2176b41bf13", {
			format: 1,
			data: {
				width: 21,
				height: 15,
				orientation: "orthogonal",
				tilewidth: 32,
				tileheight: 32,
				tilesets: [
					{
						columns: 12,
						margin: 0,
						spacing: 0,
						tilewidth: 32,
						tileheight: 32,
						tilecount: 132,
						firstgid: 1,
						image: "tiles",
						name: "tiles",
						imagewidth: 384,
						imageheight: 352,
					},
				],
				layers: [
					{
						type: "tilelayer",
						name: "levelLayer",
						width: 21,
						height: 15,
						opacity: 1,
						data: [45, 46, 46, 46, 46, 46, 46, 46, 46, 47, 5, 45, 46, 46, 46, 46, 46, 46, 46, 46, 47, 57, 0, 0, 0, 0, 0, 0, 0, 0, 60, 17, 60, 0, 2, 3, 3, 2, 0, 2, 0, 59, 57, 0, 81, 83, 0, 81, 46, 47, 0, 69, 46, 71, 0, 45, 46, 83, 0, 81, 83, 0, 59, 57, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 59, 57, 2, 81, 83, 0, 48, 0, 69, 46, 83, 0, 81, 46, 71, 0, 48, 0, 81, 83, 0, 59, 60, 3, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 60, 69, 46, 46, 83, 0, 69, 46, 47, 0, 53, 56, 55, 0, 45, 46, 71, 0, 81, 46, 46, 71, 104, 0, 0, 0, 0, 0, 0, 60, 0, 65, 68, 67, 0, 60, 0, 0, 2, 0, 0, 0, 104, 45, 46, 46, 83, 0, 48, 0, 72, 0, 77, 79, 80, 0, 72, 3, 48, 2, 81, 46, 46, 47, 60, 0, 0, 0, 0, 60, 0, 0, 0, 0, 95, 0, 0, 0, 0, 60, 2, 0, 0, 0, 60, 57, 0, 81, 47, 0, 72, 0, 48, 0, 81, 46, 83, 0, 48, 0, 72, 0, 45, 83, 0, 59, 57, 0, 0, 60, 0, 0, 0, 60, 0, 0, 84, 0, 0, 60, 3, 3, 0, 60, 0, 0, 59, 69, 47, 0, 72, 0, 81, 83, 69, 83, 0, 0, 0, 81, 71, 81, 83, 0, 72, 0, 45, 71, 5, 60, 0, 0, 2, 2, 0, 0, 0, 0, 58, 0, 0, 0, 0, 3, 0, 0, 0, 60, 5, 17, 69, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 71, 17],
					},
					{
						type: "tilelayer",
						name: "groundLayer",
						width: 21,
						height: 15,
						opacity: 1,
						data: [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3, 3, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 13, 2, 2, 1, 2, 1, 1, 1, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 25, 2, 2, 1, 3, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 37, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 2, 2, 3, 2, 1, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 3, 1, 1, 1, 3, 2, 1, 1, 1, 3, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 2, 3, 3, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 13, 14, 15, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 26, 27, 3, 2, 2, 2, 3, 1],
					},
				],
			},
		});
		const editabletilemap = this.add.tilemap("editabletilemap_e6158e91-a687-48b5-9757-c2176b41bf13");
		editabletilemap.addTilesetImage("tiles");

		// groundLayer
		editabletilemap.createLayer("groundLayer", ["tiles"], 0, 0);

		// levelLayer
		const levelLayer = editabletilemap.createLayer("levelLayer", ["tiles"], 0, 0);

		// bombsLayer
		const bombsLayer = this.add.layer();

		// bomb
		const bomb = new Bomb(this, 32, 64);
		bombsLayer.add(bomb);

		// bomb_1
		const bomb_1 = new Bomb(this, 608, 64);
		bombsLayer.add(bomb_1);

		// bomb_2
		const bomb_2 = new Bomb(this, 32, 352);
		bombsLayer.add(bomb_2);

		// bomb_3
		const bomb_3 = new Bomb(this, 608, 352);
		bombsLayer.add(bomb_3);

		// itemsLayer
		const itemsLayer = this.add.layer();

		// coin
		const coin = new Coin(this, 64, 96);
		itemsLayer.add(coin);

		// coin_1
		const coin_1 = new Coin(this, 96, 96);
		itemsLayer.add(coin_1);

		// coin_2
		const coin_2 = new Coin(this, 128, 96);
		itemsLayer.add(coin_2);

		// coin_3
		const coin_3 = new Coin(this, 128, 288);
		itemsLayer.add(coin_3);

		// coin_4
		const coin_4 = new Coin(this, 128, 320);
		itemsLayer.add(coin_4);

		// coin_5
		const coin_5 = new Coin(this, 128, 352);
		itemsLayer.add(coin_5);

		// coin_6
		const coin_6 = new Coin(this, 32, 288);
		itemsLayer.add(coin_6);

		// coin_7
		const coin_7 = new Coin(this, 32, 320);
		itemsLayer.add(coin_7);

		// coin_8
		const coin_8 = new Coin(this, 128, 416);
		itemsLayer.add(coin_8);

		// coin_9
		const coin_9 = new Coin(this, 160, 416);
		itemsLayer.add(coin_9);

		// coin_10
		const coin_10 = new Coin(this, 192, 416);
		itemsLayer.add(coin_10);

		// coin_11
		const coin_11 = new Coin(this, 192, 160);
		itemsLayer.add(coin_11);

		// coin_12
		const coin_12 = new Coin(this, 160, 32);
		itemsLayer.add(coin_12);

		// coin_13
		const coin_13 = new Coin(this, 192, 32);
		itemsLayer.add(coin_13);

		// coin_14
		const coin_14 = new Coin(this, 224, 32);
		itemsLayer.add(coin_14);

		// coin_15
		const coin_15 = new Coin(this, 256, 32);
		itemsLayer.add(coin_15);

		// coin_16
		const coin_16 = new Coin(this, 192, 128);
		itemsLayer.add(coin_16);

		// coin_17
		const coin_17 = new Coin(this, 320, 384);
		itemsLayer.add(coin_17);

		// coin_18
		const coin_18 = new Coin(this, 384, 416);
		itemsLayer.add(coin_18);

		// coin_19
		const coin_19 = new Coin(this, 416, 416);
		itemsLayer.add(coin_19);

		// coin_20
		const coin_20 = new Coin(this, 448, 416);
		itemsLayer.add(coin_20);

		// coin_21
		const coin_21 = new Coin(this, 480, 416);
		itemsLayer.add(coin_21);

		// coin_22
		const coin_22 = new Coin(this, 448, 352);
		itemsLayer.add(coin_22);

		// coin_23
		const coin_23 = new Coin(this, 448, 320);
		itemsLayer.add(coin_23);

		// coin_24
		const coin_24 = new Coin(this, 448, 224);
		itemsLayer.add(coin_24);

		// coin_25
		const coin_25 = new Coin(this, 448, 160);
		itemsLayer.add(coin_25);

		// coin_26
		const coin_26 = new Coin(this, 448, 128);
		itemsLayer.add(coin_26);

		// coin_27
		const coin_27 = new Coin(this, 448, 96);
		itemsLayer.add(coin_27);

		// coin_28
		const coin_28 = new Coin(this, 576, 160);
		itemsLayer.add(coin_28);

		// coin_29
		const coin_29 = new Coin(this, 608, 160);
		itemsLayer.add(coin_29);

		// coin_30
		const coin_30 = new Coin(this, 608, 128);
		itemsLayer.add(coin_30);

		// coin_31
		const coin_31 = new Coin(this, 576, 416);
		itemsLayer.add(coin_31);

		// coin_32
		const coin_32 = new Coin(this, 576, 384);
		itemsLayer.add(coin_32);

		// coin_33
		const coin_33 = new Coin(this, 576, 352);
		itemsLayer.add(coin_33);

		// coin_34
		const coin_34 = new Coin(this, 608, 288);
		itemsLayer.add(coin_34);

		// coin_35
		const coin_35 = new Coin(this, 64, 416);
		itemsLayer.add(coin_35);

		// coin_36
		const coin_36 = new Coin(this, 64, 384);
		itemsLayer.add(coin_36);

		// coin_37
		const coin_37 = new Coin(this, 608, 32);
		itemsLayer.add(coin_37);

		// coin_38
		const coin_38 = new Coin(this, 576, 32);
		itemsLayer.add(coin_38);

		// coin_39
		const coin_39 = new Coin(this, 576, 96);
		itemsLayer.add(coin_39);

		// coin_40
		const coin_40 = new Coin(this, 608, 96);
		itemsLayer.add(coin_40);

		// coin_41
		const coin_41 = new Coin(this, 512, 192);
		itemsLayer.add(coin_41);

		// coin_42
		const coin_42 = new Coin(this, 512, 160);
		itemsLayer.add(coin_42);

		// coin_43
		const coin_43 = new Coin(this, 512, 256);
		itemsLayer.add(coin_43);

		// coin_44
		const coin_44 = new Coin(this, 512, 352);
		itemsLayer.add(coin_44);

		// coin_45
		const coin_45 = new Coin(this, 384, 352);
		itemsLayer.add(coin_45);

		// coin_46
		const coin_46 = new Coin(this, 256, 352);
		itemsLayer.add(coin_46);

		// coin_47
		const coin_47 = new Coin(this, 288, 128);
		itemsLayer.add(coin_47);

		// coin_48
		const coin_48 = new Coin(this, 256, 160);
		itemsLayer.add(coin_48);

		// enemiesLayer
		const enemiesLayer = this.add.layer();

		// uiLayer
		const uiLayer = this.add.layer();

		// tutorialText
		const tutorialText = new UIText(this, 336, 240);
		tutorialText.visible = false;
		tutorialText.text = "Arrow keys to move!\nPress Spacebar to Start";
		tutorialText.setStyle({  });
		uiLayer.add(tutorialText);

		// scoreText
		const scoreText = new UIText(this, 0, 454.34375);
		scoreText.setOrigin(0, 0);
		scoreText.text = "Score: 0";
		scoreText.setStyle({ "fontSize": "20px" });
		uiLayer.add(scoreText);

		// gameOverText
		const gameOverText = new UIText(this, 336, 240);
		gameOverText.visible = false;
		gameOverText.text = "Game Over";
		gameOverText.setStyle({ "fontSize": "64px" });
		uiLayer.add(gameOverText);

		// player
		const player = new Player(this, 320, 96);
		this.add.existing(player);

		// player_vs_enemies
		this.physics.add.overlap(player, enemiesLayer.list, this.hitPlayer, undefined, this);

		// player_vs_items
		this.physics.add.overlap(player, itemsLayer.list, this.collectItem, undefined, this);

		this.levelLayer = levelLayer;
		this.enemiesLayer = enemiesLayer;
		this.tutorialText = tutorialText;
		this.scoreText = scoreText;
		this.gameOverText = gameOverText;
		this.player = player;
		this.editabletilemap = editabletilemap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	levelLayer;
	/** @type {Phaser.GameObjects.Layer} */
	enemiesLayer;
	/** @type {UIText} */
	tutorialText;
	/** @type {UIText} */
	scoreText;
	/** @type {UIText} */
	gameOverText;
	/** @type {Player} */
	player;
	/** @type {Phaser.Tilemaps.Tilemap} */
	editabletilemap;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.initVariables();

		this.initInput();

		this.tutorialText.setVisible(true);
	}

	update(time, delta) {

		if (!this.gameStarted) {

			return;
		}

		this.player.update(delta);

		this.addEnemy();
	}

	/**
	 * 
	 * @param {Player} player 
	 * @param {Enemy} obstacle 
	 */
	hitPlayer (player, obstacle) {

        player.hit();

        this.gameOver();
    }

	/**
	 * 
	 * @param {Player} player 
	 * @param {Coin} item 
	 */
    collectItem (player, item) {

        item.collect();
    }

	initInput() {

		this.cursors = this.input.keyboard.createCursorKeys();

		// check for spacebar press only once
		this.cursors.space.once("down", (key, event) => {

			this.startGame();
		});
	}

	startGame() {

		this.gameStarted = true;

		this.tutorialText.setVisible(false);
	}

	addEnemy() {

		// spawn enemy every 3 seconds
		if (this.spawnCounterEnemy-- > 0) {

			return;
		}

		this.spawnCounterEnemy = this.spawnRateEnemy;

		const enemy = new Enemy(this, 320, 256);
		this.enemiesLayer.add(enemy);
	}

	getTileAt(x, y) {

		const tile = this.levelLayer.getTileAtWorldXY(x, y, true);

		return tile ? this.tileIds.walls.indexOf(tile.index) : -1;
	}

	initVariables() {

		this.gameStarted = false;
		this.score = 0;
		this.centreX = this.scale.width * 0.5;
		this.centreY = this.scale.height * 0.5;

		this.spawnCounterEnemy = 0;
		this.spawnRateEnemy = 3 * 60;

		this.tileIds = {
			walls: [45, 46, 47, 48, 53, 54, 55, 56, 57, 58, 59, 60, 65, 66, 67, 68, 69, 70, 71, 72, 77, 78, 79, 80, 81, 82, 83, 84]
		}
	}

	gameOver () {

        this.gameStarted = false;

        this.gameOverText.setVisible(true);

		this.cursors.space.once("down", () => {

			this.scene.start("Level");
		});
    }

	updateScore (points) {

        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

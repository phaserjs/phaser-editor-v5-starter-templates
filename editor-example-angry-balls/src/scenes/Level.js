
// You can write more code here

/* START OF COMPILED CODE */

import { CreateWorld } from "../../lib/PhaserBox2D.js";
import { SetWorldScale } from "../../lib/PhaserBox2D.js";
import { b2DefaultWorldDef } from "../../lib/PhaserBox2D.js";
import { b2CreateBody } from "../../lib/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../../lib/PhaserBox2D.js";
import { pxmVec2 } from "../../lib/PhaserBox2D.js";
import { b2CreatePolygonShape } from "../../lib/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../../lib/PhaserBox2D.js";
import { pxm } from "../../lib/PhaserBox2D.js";
import { b2MakeBox } from "../../lib/PhaserBox2D.js";
import { AddSpriteToWorld } from "../../lib/PhaserBox2D.js";
import Stone from "./Stone.js";
import Wood3 from "./Wood3.js";
import Debris1 from "./Debris1.js";
import Wood1 from "./Wood1.js";
import Wood2 from "./Wood2.js";
import Debris2 from "./Debris2.js";
import Player from "./Player.js";
import { WorldStep } from "../../lib/PhaserBox2D.js";
import { UpdateWorldSprites } from "../../lib/PhaserBox2D.js";
import { b2WorldId } from "../../lib/PhaserBox2D.js";
/* START-USER-IMPORTS */
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
		// Box2D world creation
		SetWorldScale(40);
		const world = CreateWorld({ worldDef: { 
			...b2DefaultWorldDef()
		 }});
		this.worldId = world.worldId;

		// platformBody
		const platformBody = b2CreateBody(this.worldId, { 
			...b2DefaultBodyDef(), 
			position: pxmVec2(284, -599)
		 });

		// platformShape
		const platformShape = b2CreatePolygonShape(platformBody, { 
			...b2DefaultShapeDef()
		 }, b2MakeBox(pxm(31), pxm(68)));

		// bg
		const bg = this.add.tileSprite(0, -304, 2100, 1024, "colored_grass");
		bg.setOrigin(0, 0);

		// grass
		const grass = this.add.tileSprite(1050, 700, 2100, 70, "grass");

		// body
		const body = b2CreateBody(this.worldId, { 
			...b2DefaultBodyDef(), 
			position: pxmVec2(1050, -700)
		 });

		// add body to grass
		AddSpriteToWorld(this.worldId, grass, { bodyId: body });

		// shape
		const shape = b2CreatePolygonShape(body, { 
			...b2DefaultShapeDef()
		 }, b2MakeBox(pxm(1050), pxm(35)));

		// stone2
		const stone2 = new Stone(this, 1610, 560, "elementStone011");
		this.add.existing(stone2);

		// wood4
		const wood4 = new Wood3(this, 1610, 490);
		this.add.existing(wood4);

		// debris2
		const debris2 = new Debris1(this, 1435, 356);
		this.add.existing(debris2);

		// wood3
		const wood3 = new Wood1(this, 1400, 560);
		this.add.existing(wood3);

		// wood2
		const wood2 = new Wood2(this, 1478, 420);
		this.add.existing(wood2);

		// stone1
		const stone1 = new Stone(this, 1610, 630, "elementStone011");
		this.add.existing(stone1);

		// debris1
		const debris1 = new Debris2(this, 1499, 358);
		this.add.existing(debris1);

		// stone4
		this.add.image(284, 564, "elementStone011");

		// stone3
		this.add.image(283, 633, "elementStone011");

		// wood
		const wood = new Wood3(this, 971, 410);
		this.add.existing(wood);

		// wood1
		const wood1 = new Wood1(this, 969, 556);
		this.add.existing(wood1);

		// debris
		const debris = new Debris1(this, 1476, 309);
		this.add.existing(debris);

		// player
		const player = new Player(this, 282, 450);
		this.add.existing(player);

		// stone
		const stone = new Stone(this, 1060, 630);
		this.add.existing(stone);

		// stone_1
		const stone_1 = new Stone(this, 1037, 562);
		this.add.existing(stone_1);

		this.bg = bg;
		this.player = player;

		this.events.emit("scene-awake");
	}

	update(time, delta) {

		WorldStep({ worldId: this.worldId, deltaTime: delta });
		UpdateWorldSprites(this.worldId);
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	bg;
	/** @type {Player} */
	player;
	/** @type {b2WorldId} */
	worldId;

	/* START-USER-CODE */

	// Write more your code here

	waiting = false;

	create() {

		this.editorCreate();

		const camera = this.cameras.main;
		camera.setBounds(0, 0, this.bg.width, this.bg.height / 2, false);

		this.followPlayer();

		const playerX = this.player.x;
		const playerY = this.player.y;

		this.input.on("pointerdown", () => {

			if (this.waiting) {

				return;
			}

			this.waiting = true;

			const { x, y } = this.input.activePointer.position;

			const forceX = this.player.x - x;
			const forceY = this.player.y - y;

			const factor = 12;

			this.player.applyForce(forceX * factor, -forceY * factor);

			setTimeout(() => {

				this.player = new Player(this, playerX, playerY);

				this.add.existing(this.player);

				this.followPlayer();

				this.waiting = false;

			}, 3000);
		});
	}

	followPlayer() {

		const camera = this.cameras.main;

		camera.startFollow(this.player, false, 0.5, 0.5);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

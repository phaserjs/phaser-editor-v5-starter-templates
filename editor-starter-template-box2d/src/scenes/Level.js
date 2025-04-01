
// You can write more code here

/* START OF COMPILED CODE */

import { CreateWorld } from "../box2d/PhaserBox2D.js";
import { SetWorldScale } from "../box2d/PhaserBox2D.js";
import { b2DefaultWorldDef } from "../box2d/PhaserBox2D.js";
import { PhaserDebugDraw } from "../box2d/PhaserDebugDraw.js";
import { b2CreateBody } from "../box2d/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../box2d/PhaserBox2D.js";
import { b2BodyType } from "../box2d/PhaserBox2D.js";
import { pxmVec2 } from "../box2d/PhaserBox2D.js";
import { AddSpriteToWorld } from "../box2d/PhaserBox2D.js";
import { b2CreatePolygonShape } from "../box2d/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../box2d/PhaserBox2D.js";
import { pxm } from "../box2d/PhaserBox2D.js";
import { b2Vec2 } from "../box2d/PhaserBox2D.js";
import { b2ComputeHull } from "../box2d/PhaserBox2D.js";
import { b2MakePolygon } from "../box2d/PhaserBox2D.js";
import { b2MakeBox } from "../box2d/PhaserBox2D.js";
import { WorldStep } from "../box2d/PhaserBox2D.js";
import { UpdateWorldSprites } from "../box2d/PhaserBox2D.js";
import { b2World_Draw } from "../box2d/PhaserBox2D.js";
import { b2WorldId } from "../box2d/PhaserBox2D.js";
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

		// dino
		const dino = this.add.image(640, 288, "dino");
		dino.setInteractive(new Phaser.Geom.Rectangle(0, 0, 250, 250), Phaser.Geom.Rectangle.Contains);

		// dinoBody
		const dinoBody = b2CreateBody(this.worldId, { 
			...b2DefaultBodyDef(), 
			type: b2BodyType.b2_dynamicBody, 
			position: pxmVec2(640, -288)
		 });

		// add dinoBody to dino
		AddSpriteToWorld(this.worldId, dino, { bodyId: dinoBody });

		// dinoShape
		const dinoShape = b2CreatePolygonShape(dinoBody, { 
			...b2DefaultShapeDef()
		 }, b2MakePolygon(b2ComputeHull([new b2Vec2(pxm(24.459450319691882), pxm(-111.95298247032741)), new b2Vec2(pxm(78.80519957882711), pxm(-86.7210274571575)), new b2Vec2(pxm(96.27347612640631), pxm(-39.16849685541422)), new b2Vec2(pxm(48.720945524662966), pxm(107.37093418261097)), new b2Vec2(pxm(6.991173772112802), pxm(116.10507245640053)), new b2Vec2(pxm(-79.37974915758423), pxm(61.75932319726536)), new b2Vec2(pxm(-118.19814148553792), pxm(-66.34137148498178)), new b2Vec2(pxm(-78.4092893493854), pxm(-97.39608534734475))], 8), 0));

		// welcome
		const welcome = this.add.text(640, 639, "", {});
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Phaser 3 + Phaser Editor v4 + Box2D";
		welcome.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// textBody
		const textBody = b2CreateBody(this.worldId, { 
			...b2DefaultBodyDef(), 
			position: pxmVec2(640, -639)
		 });

		// add textBody to welcome
		AddSpriteToWorld(this.worldId, welcome, { bodyId: textBody });

		// textShape
		const textShape = b2CreatePolygonShape(textBody, { 
			...b2DefaultShapeDef()
		 }, b2MakeBox(pxm(250.5), pxm(16.2451171875)));

		// Box2D debug graphics
		this.debugGraphics = this.add.graphics();
		this.debugDraw = new PhaserDebugDraw(this.debugGraphics, this.game.scale.width, this.game.scale.height, 40);

		this.dino = dino;
		this.welcome = welcome;

		this.events.emit("scene-awake");
	}

	update(time, delta) {

		WorldStep({ worldId: this.worldId, deltaTime: delta });
		UpdateWorldSprites(this.worldId);
		this.debugGraphics.clear();
		b2World_Draw(this.worldId, this.debugDraw);
	}

	/** @type {Phaser.GameObjects.Image} */
	dino;
	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {b2WorldId} */
	worldId;
	/** @type {Phaser.GameObjects.Graphics} */
	debugGraphics;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.dino.on("pointerdown", () => {

			this.welcome.text = "Hello, World!";
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

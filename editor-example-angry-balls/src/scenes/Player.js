
// You can write more code here

/* START OF COMPILED CODE */

import { b2CreateBody } from "../../lib/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../../lib/PhaserBox2D.js";
import { b2BodyType } from "../../lib/PhaserBox2D.js";
import { pxmVec2 } from "../../lib/PhaserBox2D.js";
import { AddSpriteToWorld } from "../../lib/PhaserBox2D.js";
import { b2CreateCircleShape } from "../../lib/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../../lib/PhaserBox2D.js";
import { b2Filter } from "../../lib/PhaserBox2D.js";
import { b2Circle } from "../../lib/PhaserBox2D.js";
import { pxm } from "../../lib/PhaserBox2D.js";
import { b2Vec2 } from "../../lib/PhaserBox2D.js";
/* START-USER-IMPORTS */
import { b2Body_ApplyForceToCenter } from "../../lib/PhaserBox2D.js";
/* END-USER-IMPORTS */

export default class Player extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 532, y ?? 262, texture || "alienPink_round", frame);

		// body
		const body = b2CreateBody(this.scene.worldId, { 
			...b2DefaultBodyDef(), 
			type: b2BodyType.b2_dynamicBody, 
			position: pxmVec2(x, -y)
		 });

		// add body to this
		AddSpriteToWorld(this.scene.worldId, this, { bodyId: body });

		// shape
		const shape = b2CreateCircleShape(body, { 
			...b2DefaultShapeDef(), 
			friction: 0.5, 
			filter: { 
				categoryBits: 2, 
				maskBits: 3, 
				groupIndex: 0
			 }
		 }, new b2Circle(new b2Vec2(pxm(0), pxm(0)), pxm(33)));

		this.body = body;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {b2BodyId} */
	body;

	/* START-USER-CODE */

	applyForce(x, y) {

		b2Body_ApplyForceToCenter(this.body, new b2Vec2(x, y), true);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

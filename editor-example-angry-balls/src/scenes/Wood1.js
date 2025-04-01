
// You can write more code here

/* START OF COMPILED CODE */

import { b2CreateBody } from "../../lib/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../../lib/PhaserBox2D.js";
import { b2BodyType } from "../../lib/PhaserBox2D.js";
import { pxmVec2 } from "../../lib/PhaserBox2D.js";
import { AddSpriteToWorld } from "../../lib/PhaserBox2D.js";
import { b2CreatePolygonShape } from "../../lib/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../../lib/PhaserBox2D.js";
import { pxm } from "../../lib/PhaserBox2D.js";
import { b2MakeBox } from "../../lib/PhaserBox2D.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Wood1 extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 780, y ?? 300, texture || "elementWood019", frame);

		// body
		const body = b2CreateBody(this.scene.worldId, { 
			...b2DefaultBodyDef(), 
			type: b2BodyType.b2_dynamicBody, 
			position: pxmVec2(x, -y)
		 });

		// add body to this
		AddSpriteToWorld(this.scene.worldId, this, { bodyId: body });

		// shape
		const shape = b2CreatePolygonShape(body, { 
			...b2DefaultShapeDef()
		 }, b2MakeBox(pxm(35), pxm(110)));

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

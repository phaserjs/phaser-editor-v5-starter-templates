
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
import { b2Vec2 } from "../../lib/PhaserBox2D.js";
import { b2ComputeHull } from "../../lib/PhaserBox2D.js";
import { b2MakePolygon } from "../../lib/PhaserBox2D.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Debris1 extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 634, y ?? 258, texture || "debrisWood_2", frame);

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
		 }, b2MakePolygon(b2ComputeHull([new b2Vec2(pxm(-25.105138566407845), pxm(-19.858408917583176)), new b2Vec2(pxm(12.64858113440664), pxm(-28.387848152594472)), new b2Vec2(pxm(26.035131445289835), pxm(-1.1095946889080892)), new b2Vec2(pxm(10.21270783863099), pxm(28.302290725651744)), new b2Vec2(pxm(3.602415730736084), pxm(28.113425236854738)), new b2Vec2(pxm(-25.105138566407845), pxm(-12.681520343297166))], 6), 0));

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

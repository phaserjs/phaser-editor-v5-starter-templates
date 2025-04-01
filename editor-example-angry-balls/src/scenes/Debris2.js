
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

export default class Debris2 extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 690, y ?? 265, texture || "debrisWood_3", frame);

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
		 }, b2MakePolygon(b2ComputeHull([new b2Vec2(pxm(-28.82311623850228), pxm(2.710206073104416)), new b2Vec2(pxm(-9.750711834615004), pxm(-24.944780312532203)), new b2Vec2(pxm(-3.552180403351599), pxm(-24.706375257483614)), new b2Vec2(pxm(27.44047675296531), pxm(-12.070907339908274)), new b2Vec2(pxm(27.44047675296531), pxm(14.86886388058258)), new b2Vec2(pxm(20.288325101507553), pxm(19.636964981554428)), new b2Vec2(pxm(-0.6913197427684281), pxm(25.12028124767201))], 7), 0));

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

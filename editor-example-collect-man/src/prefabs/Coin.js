
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Coin extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 339, y ?? 144, texture || "tiles", frame ?? 93);

		this.setOrigin(0, 0);
		scene.physics.add.existing(this, false);
		this.body.setSize(32, 32, false);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	collect () {

        this.scene.updateScore(10);

        this.destroy(true);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

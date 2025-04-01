
// You can write more code here

/* START OF COMPILED CODE */

import UIText from "../prefabs/UIText.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(408, 408, "background");

		// uIText
		const uIText = new UIText(this, 400, 300);
		this.add.existing(uIText);
		uIText.text = "Game Over";
		uIText.setStyle({  });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.input.once("pointerdown", () => this.startLevel());
		
		this.input.keyboard.once("keydown-SPACE", () => this.startLevel());
	}

	startLevel() {

		this.scene.start("Level");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

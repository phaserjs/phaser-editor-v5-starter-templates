
// You can write more code here

/* START OF COMPILED CODE */

import { OnAwakeScript } from "@phaserjs/editor-scripts-quick";
import { MoveInSceneActionScript } from "@phaserjs/editor-scripts-quick";
import { SkinsAndAnimationBoundsProvider } from "@esotericsoftware/spine-phaser";
import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import StartAnimationComp from "../components/StartAnimationComp";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(640, 576, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Phaser 4 + Spine + Phaser Editor v5\nWebpack + TypeScript";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(text);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// goblin
		const goblin = this.add.spine(454, 480, "goblins", "goblins-atlas", new SkinsAndAnimationBoundsProvider(null, ["goblin"]));
		goblin.skeleton.setSkinByName("goblin");

		// goblinGirl
		const goblinGirl = this.add.spine(800, 480, "goblins", "goblins-atlas", new SkinsAndAnimationBoundsProvider(null, ["goblingirl"]));
		goblinGirl.skeleton.setSkinByName("goblingirl");
		goblinGirl.scaleX = -1;

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "BOTTOM";

		// goblin (components)
		const goblinStartAnimationComp = new StartAnimationComp(goblin);
		goblinStartAnimationComp.animationName = "walk";

		// goblinGirl (components)
		const goblinGirlStartAnimationComp = new StartAnimationComp(goblinGirl);
		goblinGirlStartAnimationComp.animationName = "walk";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

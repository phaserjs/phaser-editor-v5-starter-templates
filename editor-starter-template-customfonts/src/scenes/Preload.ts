
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import assetPackUrl from "../../static/assets/asset-pack.json";
import { WebFontFile } from "../fileloaders/WebFontFile";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// guapen
		const guapen = this.add.image(505.0120544433594, 360, "guapen");
		guapen.scaleX = 0.32715486817515643;
		guapen.scaleY = 0.32715486817515643;

		// progressBar
		const progressBar = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// progressBarBg
		const progressBarBg = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(552.0120849609375, 329, "", {});
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		this.progressBarBg = progressBarBg;

		this.events.emit("scene-awake");
	}

	private progressBarBg!: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		// here two variants for loading a font:

		// 1. providing the full configuration:

		this.load.webfont("troika", {
			custom: {
				families: ["troika"]
			}
		});

		// 2. only providing the key, which is used as font family

		this.load.webfont("caroni");

		this.load.pack("asset-pack", assetPackUrl);

		const width = this.progressBarBg.width;

		this.load.on("progress", (p: number) => {

			this.progressBarBg.width = width * p;
		});
	}

	create() {

		if (process.env.NODE_ENV === "development") {

			const start = new URLSearchParams(location.search).get("start");

			if (start) {

				console.log(`Development: jump to ${start}`);
				this.scene.start(start);

				return;
			}
		}

		this.scene.start("Level");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

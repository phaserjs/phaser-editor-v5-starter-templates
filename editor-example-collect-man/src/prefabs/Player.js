
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { ANIM_PLAYER_DOWN, ANIM_PLAYER_LEFT, ANIM_PLAYER_RIGHT, ANIM_PLAYER_UP } from "../../assets/animations.js";
/* END-USER-IMPORTS */

export default class Player extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 301, y ?? 171, texture || "characters", frame ?? 1);

		this.setOrigin(0, 0);
		scene.physics.add.existing(this, false);
		this.body.collideWorldBounds = true;
		this.body.setSize(32, 32, false);
		this.play("player-down");

		/* START-USER-CTR-CODE */
		this.target.x = x;
		this.target.y = y;
		this.frameDuration = this.moveSpeed / 32;

		// set map boundaries
		this.mapLeft = 0
		this.mapRight = 672 - 32
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	moveSpeed = 300; // time in milliseconds to move from one tile to another
	frameDuration = 0;
	accumulator = 0;
	target = { x: 0, y: 0 };

	update(delta) {

		this.accumulator += delta;

		while (this.accumulator > this.frameDuration) {

			this.accumulator -= this.frameDuration;

			this.checkInput();

			this.move();
		}
	}

	checkInput() {

		// check if player is at target position

		if (this.target.x === this.x && this.target.y === this.y) {

			const cursors = this.scene.cursors; // get cursors object from Game scene
			const leftKey = cursors.left.isDown;
			const rightKey = cursors.right.isDown;
			const upKey = cursors.up.isDown;
			const downKey = cursors.down.isDown;

			const moveDirection = { x: 0, y: 0 }; // default move direction

			if (leftKey) {
				
				moveDirection.x--;

			} else if (rightKey) {
				
				moveDirection.x++;

			} else if (upKey) {
				
				moveDirection.y--;

			} else if (downKey) {
				
				moveDirection.y++;
			}

			// set next tile coordinates to move towards
			const nextPosition = {
				x: this.x + moveDirection.x * 32,
				y: this.y + moveDirection.y * 32
			};

			// check if next tile to move towards is walkable
			const isWall = this.scene.getTileAt(nextPosition.x, nextPosition.y);

			if (isWall === -1) {
				// set target position to move towards
				this.target.x = nextPosition.x;
				this.target.y = nextPosition.y;
			}
		}
	}

	// move player towards target position
	move() {

		if (this.x < this.target.x) {

			this.x++;
			this.anims.play(ANIM_PLAYER_RIGHT, true);

		} else if (this.x > this.target.x) {

			this.x--;
			this.anims.play(ANIM_PLAYER_LEFT, true);

		} if (this.y < this.target.y) {

			this.y++;
			this.anims.play(ANIM_PLAYER_DOWN, true);

		} else if (this.y > this.target.y) {

			this.y--;
			this.anims.play(ANIM_PLAYER_UP, true);
		}

		// check if player has moved off screen
		if (this.x < this.mapLeft) {

			this.x = this.mapRight;
			this.target.x = this.mapRight - 16;

		} else if (this.x > this.mapRight) {

			this.x = this.mapLeft;
			this.target.x = this.mapLeft + 16;
		}
	}

	hit() {

		this.destroy(true);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

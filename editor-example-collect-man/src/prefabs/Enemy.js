
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { ANIM_ENEMY_DOWN, ANIM_ENEMY_LEFT, ANIM_ENEMY_RIGHT, ANIM_ENEMY_UP } from "../../assets/animations.js";
/* END-USER-IMPORTS */

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 283, y ?? 205, texture || "characters", frame ?? 49);

        this.setOrigin(0, 0);
        scene.physics.add.existing(this, false);
        this.body.collideWorldBounds = true;
        this.body.setSize(32, 32, false);
        this.play("enemy-down");

        /* START-USER-CTR-CODE */

        this.target.x = x;
        this.target.y = y;

        this.targetPrev.x = this.target.x;
        this.targetPrev.y = this.target.y;

        this.setPosition(this.target.x, this.target.y);

        this.direction.x = Math.round(Math.random()) === 0 ? -1 : 1;

        this.frameDuration = this.moveSpeed / 32;

        this.mapLeft = 16;
        this.mapRight = 672 - 32;

        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */

    moveSpeed = 300; // time in milliseconds to move from one tile to another
    frameDuration = 0;
    accumulator = 0;
    direction = { x: 0, y: 0 };
    target = { x: 0, y: 0 };
    targetPrev = { x: 0, y: 0 };

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.accumulator += delta;

        while (this.accumulator > this.frameDuration) {

            this.accumulator -= this.frameDuration;

            this.checkPosition();

            this.move();
        }
    }

    checkPosition() {

        // check if enemy is at target position

        if (this.target.x === this.x && this.target.y === this.y) {

            const left = this.x - 32;
            const right = this.x + 32;
            const top = this.y - 32;
            const bottom = this.y + 32;

            // check left
            const leftPosition = { x: left, y: this.y };
            const tileLeft = this.scene.getTileAt(leftPosition.x, leftPosition.y);

            // check right
            const rightPosition = { x: right, y: this.y };
            const tileRight = this.scene.getTileAt(rightPosition.x, rightPosition.y);

            // check top
            const topPosition = { x: this.x, y: top };
            const tileTop = this.scene.getTileAt(topPosition.x, topPosition.y);

            // check bottom
            const bottomPosition = { x: this.x, y: bottom };
            const tileBottom = this.scene.getTileAt(bottomPosition.x, bottomPosition.y);

            const nextTargets = []; // list of possible next targets

            // moving left
            if (this.direction.x === -1) {

                if (tileLeft === -1) {

                    nextTargets.push(leftPosition, leftPosition, leftPosition, leftPosition);
                }

                if (tileTop === -1) {

                    nextTargets.push(topPosition);
                }

                if (tileBottom === -1) {

                    nextTargets.push(bottomPosition);
                }
            }

            // moving right
            else if (this.direction.x === 1) {

                if (tileRight === -1) {

                    nextTargets.push(rightPosition, rightPosition, rightPosition, rightPosition);
                }

                if (tileTop === -1) {

                    nextTargets.push(topPosition);
                }

                if (tileBottom === -1) {

                    nextTargets.push(bottomPosition);
                }
            }
            // moving up
            else if (this.direction.y === -1) {

                if (tileTop === -1) {

                    nextTargets.push(topPosition, topPosition, topPosition, topPosition);
                }

                if (tileLeft === -1) {

                    nextTargets.push(leftPosition);
                }

                if (tileRight === -1) {

                    nextTargets.push(rightPosition);
                }
            }
            // moving down
            else if (this.direction.y === 1) {

                if (tileBottom === -1) {

                    nextTargets.push(bottomPosition, bottomPosition, bottomPosition, bottomPosition);
                }

                if (tileLeft === -1) {

                    nextTargets.push(leftPosition);
                }

                if (tileRight === -1) {

                    nextTargets.push(rightPosition);
                }
            }

            this.changeDirection(nextTargets);
        }
    }

    changeDirection(nextTargets) {

        const randomDirection = Phaser.Math.RND.weightedPick(nextTargets); // prioritize moving in the same direction

        this.target.x = randomDirection.x;
        this.target.y = randomDirection.y;

        if (this.x < this.target.x) {

            this.direction.x = 1;

        } else if (this.x > this.target.x) {

            this.direction.x = -1;

        } else {

            this.direction.x = 0;

        } if (this.y < this.target.y) {

            this.direction.y = 1;

        } else if (this.y > this.target.y) {

            this.direction.y = -1;

        } else {

            this.direction.y = 0;
        }
    }

    // move enemy towards target position
    move() {

        if (this.x < this.target.x) {

            this.x++;
            this.anims.play(ANIM_ENEMY_RIGHT, true);

        } else if (this.x > this.target.x) {

            this.x--;
            this.anims.play(ANIM_ENEMY_LEFT, true);

        } if (this.y < this.target.y) {

            this.y++;
            this.anims.play(ANIM_ENEMY_DOWN, true);

        } else if (this.y > this.target.y) {

            this.y--;
            this.anims.play(ANIM_ENEMY_UP, true);
        }

        if (this.x < this.mapLeft) {

            this.x = this.mapRight;

            this.target.x = this.mapRight - (32 * 0.5);

        } else if (this.x > this.mapRight) {

            this.x = this.mapLeft;

            this.target.x = this.mapLeft + (32 * 0.5);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

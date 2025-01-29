import { Physics, Scene } from "phaser";
import PlayerInterface from "../interfaces/PlayerInterface";

export class Actor extends Physics.Matter.Sprite {
    protected baseSpeed: number = 1.2; // ** [The base speed for the user]
    protected isMoving: boolean = false; // ** [Flag if the player is moving]
    protected isWalkBlocked: boolean = false; // ** [Flag if the player is blocked from Walking]
    protected isSprinting: boolean = false; // ** [Flag is player is sprinting]
    protected isAttacking: boolean = false; // ** [Flag if player is attacking]
    protected isCrouched: boolean = false; // ** [Flag is player is crouched]
    protected isJumping: boolean = false; // ** [Flag if player is jumping]
    protected doubleJump: boolean = true; // ** [Flag if player is jumping]
    protected isFalling: boolean = false; // ** [Flag if player is jumping]
    protected jumpHeight: number = -1.9; // ** [The users jump height]
    protected movingSpeedX: number = 0; // ** [The current X-axis value]
    protected movingSpeedY: number = 0; // ** [The current Y-axis value]
    protected movingSpeed: number = 0; // ** [The amount we will multiply the Left Stick axis by]
    protected jumpAllowed: boolean = true;

    // ** [The player config is stored here on load]
    protected playerConfig: PlayerInterface;

    private spriteSale: number = 0.5;
    protected hp = 100;

    constructor(scene: Scene, x: number, y: number, texture: string) {
        super(scene.matter.world, x, y, texture);

        this.setName(texture)
            .setRectangle(12, 30, {
                friction: 0.0,
                frictionAir: 0.0,
            })
            .setFixedRotation()
            .setScale(this.spriteSale);

        scene.add.existing(this);
    }
    /**
     * Return the current health of the player
     */
    public getHPValue(): number {
        return this.hp;
    }

    /**
     * Check if we need to flip the sprite
     */
    protected checkFlip(): void {
        if (this.getBody().velocity.x < 0) {
            this.scaleX = -this.spriteSale;
        } else if (this.getBody().velocity.x > 0) {
            this.scaleX = this.spriteSale;
        }
    }

    /**
     * Return the body as a  .Body
     */
    protected getBody(): MatterJS.BodyType {
        return this.body as MatterJS.BodyType;
    }
}

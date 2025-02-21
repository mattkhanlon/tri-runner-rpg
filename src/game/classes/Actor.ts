import { Physics, Scene } from "phaser";
import PlayerKeys from "../const/PlayerKeys";

export class Actor extends Physics.Matter.Sprite {
    // ** [PLAYER CONSTS / SPRITE SETTINGS]
    // ** Scale of our sprite
    private spriteSale: number = 0.5;
    // ** The width of our players hitbox
    private spriteRecWidth: number = 12;
    // ** The height of our players hitbox
    private spriteRecHeight: number = 28;
    // * The friction for our sprite
    private spriteFriction: number = 0.0;
    // ** The air friction for our sprite
    private spriteFrictionAir: number = 0.0;

    // ** [PLAYER VALUES THAT ARE MODIFIED DURING RUNTIME]
    // ** The base speed for the user
    protected baseSpeed: number = 1.2;
    // ** The users jump height
    protected jumpHeight: number = -1.9;
    // ** The current X-axis value
    protected movingSpeedX: number = 0;
    // ** The current Y-axis value
    protected movingSpeedY: number = 0;
    // ** The amount we will multiply the Left Stick axis by
    protected movingSpeed: number = 0;
    // ** The current max health of our player
    protected maxHealth: number = 100;

    // ** [FLAGS/BOOLEANS]
    // ** Flag if the player is moving
    protected isMoving: boolean = false;
    // ** Flag if the player is blocked from Walking
    protected isWalkBlocked: boolean = false;
    // ** Flag is player is sprinting
    protected isSprinting: boolean = false;
    // ** Flag if player is attacking
    protected isAttacking: boolean = false;
    // ** Flag if the player is blocked from Attacking
    protected isAttackBlocked: boolean = false;
    // ** Flag is player is crouched]
    protected isCrouched: boolean = false;
    // ** Flag is the player is allowed to jump
    protected jumpAllowed: boolean = true;
    // ** Flag if player is jumping
    protected isJumping: boolean = false;
    // ** Flag if player is jumping]
    protected doubleJump: boolean = true;
    // ** Flag if player is jumping
    protected isFalling: boolean = false;

    constructor(scene: Scene, x: number, y: number, texture: string) {
        super(scene.matter.world, x, y, texture);

        this.setName(texture)
            .setRectangle(this.spriteRecWidth, this.spriteRecHeight, {
                friction: this.spriteFriction,
                frictionAir: this.spriteFrictionAir,
            })
            .setFixedRotation()
            .setScale(this.spriteSale);

        this.setCollisionGroup(PlayerKeys.Player_Collision_Group);
        scene.add.existing(this);
    }

    /**
     * Return the current health of the player
     */
    public getHPValue(): number {
        return this.maxHealth;
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

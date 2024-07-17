import { Physics } from "phaser";
import PlayerConfig from "../config/PlayerConfig";

export class Actor extends Physics.Arcade.Sprite {
  protected baseSpeed: number = 300; // ** [The base speed for the user]
  protected isMoving: boolean = false; // ** [Flag if the player is moving]
  protected isWalkBlocked: boolean = false; // ** [Flag if the player is blocked from Walking]
  protected isSprinting: boolean = false; // ** [Flag is player is sprinting]
  protected isAttacking: boolean = false; // ** [Flag if player is attacking]
  protected isCrouched: boolean = false; // ** [Flag is player is crouched]
  protected isJumping: boolean = false; // ** [Flag if player is jumping]
  protected movingSpeedX: number = 0; // ** [The current X-axis value]
  protected movingSpeedY: number = 0; // ** [The current Y-axis value]
  protected movingSpeed: number = 0; // ** [The amount we will multiply the Left Stick axis by]

  // ** [The player config is stored here on load]
  protected playerConfig: PlayerConfig;

  protected hp = 100;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
  }

  update() {
    this.checkFlip();
  }

  /**
   * Apply damage to the player
   *
   * @param value - Damage to apply to the user
   */
  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.hp = this.hp - value;
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
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
      this.getBody().setOffset(this.getBody().width, 0);
      this.scaleX = -1;
    } else if (this.getBody().velocity.x > 0) {
      this.getBody().setOffset(0, 0);
      this.scaleX = 1;
    }
  }

  /**
   * Return the body as a Arcade.Body
   */
  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}

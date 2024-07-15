import { Physics } from "phaser";
export class Actor extends Physics.Arcade.Sprite {
  protected hp = 100;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
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

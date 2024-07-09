import { Actor } from "./Actor";
export class Player extends Actor {
  private keyUp: Phaser.Input.Keyboard.Key | undefined;
  private keyLeft: Phaser.Input.Keyboard.Key | undefined;
  private keyDown: Phaser.Input.Keyboard.Key | undefined;
  private keyRight: Phaser.Input.Keyboard.Key | undefined;

  // ** Player Settings
  protected pWidth: number = 64;
  protected pHeight: number = 64;
  protected pMoveSpeed: number = 100;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "human");

    // KEYS
    this.keyUp = this.scene.input.keyboard?.addKey("W");
    this.keyLeft = this.scene.input.keyboard?.addKey("A");
    this.keyDown = this.scene.input.keyboard?.addKey("S");
    this.keyRight = this.scene.input.keyboard?.addKey("D");

    // ANIMATIONS
    this.initAnimations();
  }

  update(): void {
    // ** Plyaer UP (VER)
    if (this.keyUp?.isDown) {
      this.body.velocity.y = -this.pMoveSpeed;

      // animation
      this.playAnimation("walk-ver-up");
    }

    // ** Plyaer LEFT (HOR)
    if (this.keyLeft?.isDown) {
      this.body.velocity.x = -this.pMoveSpeed;

      //this.getBody().setOffset(25, 0);
      this.playAnimation("walk-hor-left");
    }

    // ** Plyaer Down (VER)
    if (this.keyDown?.isDown) {
      this.body.velocity.y = this.pMoveSpeed;
      this.playAnimation("walk-ver-down");
    }

    // ** Plyaer Right (HOR)
    if (this.keyRight?.isDown) {
      this.body.velocity.x = this.pMoveSpeed;

      //this.getBody().setOffset(8, 0);
      this.playAnimation("walk-hor-right");
    }

    if (
      this.keyUp?.isUp &&
      this.keyLeft?.isUp &&
      this.keyDown?.isUp &&
      this.keyRight?.isUp
    ) {
      this.getBody().setVelocity(0);
    }
  }

  /**
   * Play a specific animation based on the key provided
   *
   * @param key Name of the animation we want to play
   */
  private playAnimation(key: string): void {
    !this.anims.isPlaying && this.anims.play(key, true);
  }

  /**
   * Create all required animations
   */
  private initAnimations(): void {
    this.scene.anims.create({
      key: "walk-hor-right",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-hor-right-",
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "walk-hor-left",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-hor-left-",
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "walk-ver-down",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-ver-down-",
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "walk-ver-up",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-ver-up-",
        end: 5,
      }),
    });
  }
}

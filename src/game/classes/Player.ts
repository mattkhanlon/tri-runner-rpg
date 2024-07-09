import { Actor } from "./Actor";
export class Player extends Actor {
  private keyUp: Phaser.Input.Keyboard.Key | undefined;
  private keyLeft: Phaser.Input.Keyboard.Key | undefined;
  private keyDown: Phaser.Input.Keyboard.Key | undefined;
  private keyRight: Phaser.Input.Keyboard.Key | undefined;
  private keySprint: Phaser.Input.Keyboard.Key | undefined;

  // ** Default Properties
  private movementSpeed: number = 100;
  private sprintSpeed: number = 1.25;
  private movementSpeedX: number = 0;
  private movementSpeedY: number = 0;

  // ** Player Settings
  protected pWidth: number = 64;
  protected pHeight: number = 64;
  protected pMoveSpeed: number = 100;
  protected isSprinting: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "human");

    // KEYS
    this.keyUp = this.scene.input.keyboard?.addKey("W");
    this.keyLeft = this.scene.input.keyboard?.addKey("A");
    this.keyDown = this.scene.input.keyboard?.addKey("S");
    this.keyRight = this.scene.input.keyboard?.addKey("D");
    this.keySprint = this.scene.input.keyboard?.addKey("SHIFT");

    // ANIMATIONS
    this.initAnimations();
  }

  /**
   * Create all required animations
   */
  private initAnimations(): void {
    this.simplePlayerAnimations();
    this.advancedPlayerAnimations();
  }

  update(): void {
    this.checkKeyboardInput();
    this.updatePlayerMovement();
  }

  /**
   * Does a check to see which keys are currently pressed
   * on the keyboard.
   */
  private checkKeyboardInput() {
    // ** Plyaer UP - movementSpeedY
    if (this.keyUp?.isDown) {
      this.movementSpeedY = -this.pMoveSpeed * 0.9;

      // animation
      if (this.isSprinting) {
        this.playAnimation("sprint-up");
      } else {
        this.playAnimation("walk-up");
      }
    }

    // ** Plyaer Down - movementSpeedY
    if (this.keyDown?.isDown) {
      this.movementSpeedY = this.pMoveSpeed * 0.9;

      // animation
      if (this.isSprinting) {
        this.playAnimation("sprint-down");
      } else {
        this.playAnimation("walk-down");
      }
    }

    // ** Plyaer LEFT - movementSpeedX
    if (this.keyLeft?.isDown) {
      this.movementSpeedX = -this.pMoveSpeed;

      // animation
      if (this.isSprinting) {
        this.playAnimation("sprint-left");
      } else {
        this.playAnimation("walk-left");
      }
    }

    // ** Plyaer Right - movementSpeedX
    if (this.keyRight?.isDown) {
      this.movementSpeedX = this.pMoveSpeed;

      // Animation
      if (this.isSprinting) {
        this.playAnimation("sprint-right");
      } else {
        this.playAnimation("walk-right");
      }
    }

    // ** Player Sprint
    if (this.keySprint?.isDown) {
      this.pMoveSpeed = this.movementSpeed * this.sprintSpeed;
      this.isSprinting = true;
    } else {
      this.pMoveSpeed = this.movementSpeed;
      this.isSprinting = false;
    }
  }

  /**
   * Update the movement of the player object if the movement X & Y
   * have value greater > 0.
   *
   * set movementSpeedX/Y to 0 if keys are not longer pressed.
   */
  private updatePlayerMovement() {
    // ** No Movement pressed Y-axis
    if (this.keyUp?.isUp && this.keyDown?.isUp) {
      this.movementSpeedY = 0;
    }

    // ** No Movement pressed X-axis
    if (this.keyLeft?.isUp && this.keyRight?.isUp) {
      this.movementSpeedX = 0;
    }

    // ** Keep the player moving
    this.getBody().setVelocity(this.movementSpeedX, this.movementSpeedY);
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
   * Simple Movement Animations
   *
   * @example walk-right
   * @example walk-left
   * @example walk-up
   * @example walk-down
   */
  private simplePlayerAnimations() {
    // ** Player Movement
    this.scene.anims.create({
      key: "walk-right",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-right-",
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "walk-left",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-left-",
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "walk-down",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-down-",
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "walk-up",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "walk-up-",
        end: 5,
      }),
    });
  }

  /**
   * Advanced Movement Animations
   *
   * @example sprint-right
   * @example sprint-left
   * @example sprint-up
   * @example sprint-down
   */
  private advancedPlayerAnimations() {
    // ** Player Movement
    this.scene.anims.create({
      key: "sprint-right",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "sprint-right-",
        end: 2,
      }),
    });

    this.scene.anims.create({
      key: "sprint-left",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "sprint-left-",
        end: 2,
      }),
    });

    this.scene.anims.create({
      key: "sprint-down",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "sprint-down-",
        end: 2,
      }),
    });

    this.scene.anims.create({
      key: "sprint-up",
      frames: this.scene.anims.generateFrameNames("a-human", {
        prefix: "sprint-up-",
        end: 2,
      }),
    });
  }
}

import { Actor } from "./Actor";

export class Player extends Actor {
  // ** [PLAYER PROPERTIES]
  private movementSpeed: number = 75;
  private sprintSpeed: number = 1.25;
  private movementSpeedX: number = 0;
  private movementSpeedY: number = 0;
  protected pMoveSpeed: number = 100;

  // ** [PLAYER FLAGS]
  protected isMoving: boolean = false;
  protected IsMoveBlocked: boolean = false;
  protected isSprinting: boolean = false;
  protected isAttacking: boolean = false;

  // ** [KEYBINDINGS][MOVEMENT]
  private keyUp: Phaser.Input.Keyboard.Key | undefined;
  private keyLeft: Phaser.Input.Keyboard.Key | undefined;
  private keyDown: Phaser.Input.Keyboard.Key | undefined;
  private keyRight: Phaser.Input.Keyboard.Key | undefined;
  private keySprint: Phaser.Input.Keyboard.Key | undefined;

  // ** [KEYBINDINGS][COMBAT]
  private keyAttack: Phaser.Input.Keyboard.Key | undefined;

  // ** [KEYBINDINGS][ITEMS]
  private keyItemOne: Phaser.Input.Keyboard.Key | undefined;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string = "player_default",
  ) {
    super(scene, x, y, texture);

    // ** [INIT PLAYER]
    this.initKeybindings();
  }

  /**
   * Initial the Keybindings for the player
   */
  private initKeybindings(): void {
    // ** [KEYBINDINGS][MOVEMENT]
    this.keyUp = this.scene.input.keyboard?.addKey("W");
    this.keyLeft = this.scene.input.keyboard?.addKey("A");
    this.keyDown = this.scene.input.keyboard?.addKey("S");
    this.keyRight = this.scene.input.keyboard?.addKey("D");
    this.keySprint = this.scene.input.keyboard?.addKey("SHIFT");

    // ** [KEYBINDINGS][COMBAT]
    this.keyAttack = this.scene.input.keyboard?.addKey("SPACE");

    // ** [KEYBINDINGS][ITEMS]
    this.keyItemOne = this.scene.input.keyboard?.addKey("E");
  }

  update(): void {
    this.checkKeyboardInput();
    this.checkPlayerMovement();
    this.updatePlayerMovement();
  }

  // ** [PLAYER CHECKS]
  /**
   * Does a check to see which keys are currently pressed
   * on the keyboard.
   */
  private checkKeyboardInput() {
    // ** [KEYBINDINGS][MOVEMENT]
    // ** UP - movementSpeedY
    if (this.keyUp?.isDown) {
      this.movementSpeedY = -this.pMoveSpeed * 0.75;
    }

    // ** Down - movementSpeedY
    if (this.keyDown?.isDown) {
      this.movementSpeedY = this.pMoveSpeed * 0.75;
    }

    // ** LEFT - movementSpeedX
    if (this.keyLeft?.isDown) {
      this.movementSpeedX = -this.pMoveSpeed;
      if (!this.IsMoveBlocked) this.playAnimation(`walk`);
    }

    // ** Right - movementSpeedX
    if (this.keyRight?.isDown) {
      this.movementSpeedX = this.pMoveSpeed;
      if (!this.IsMoveBlocked) this.playAnimation(`walk`);
    }

    // ** Sprint - sprintSpeed
    if (this.keySprint?.isDown) {
      this.pMoveSpeed = this.movementSpeed * this.sprintSpeed;
      this.isSprinting = true;
    } else {
      this.pMoveSpeed = this.movementSpeed;
      this.isSprinting = false;
    }

    // ** [KEYBINDINGS][COMBAT]
    // ** Basic Attack
    if (this.keyAttack?.isDown) {
      this.isAttacking = true;
      this.IsMoveBlocked = true;
      this.movementSpeedX = 0;
      this.movementSpeedY = 0;
      this.playAnimation(`attack-basic`);
    } else {
      this.isAttacking = false;
      this.IsMoveBlocked = false;
    }

    // ** [KEYBINDINGS][ITEMS]
  }

  /**
   * Check the ucrrent player movement
   * and set a flag to indicate the pkayer
   * is moving
   */
  private checkPlayerMovement() {
    // ** No Movement pressed Y-axis
    if (this.keyUp?.isUp && this.keyDown?.isUp) {
      this.movementSpeedY = 0;
    }

    // ** No Movement pressed X-axis
    if (this.keyLeft?.isUp && this.keyRight?.isUp) {
      this.movementSpeedX = 0;
    }

    // ** Create a flag if the player is moving
    if (this.getBody().velocity.x > 0 || this.getBody().velocity.y > 0) {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }

    // ** Flip the character in the direction we need him
    this.checkFlip();

    // ** If no movement, Play Idle animation
    if (!this.isMoving && !this.anims.isPlaying) this.playAnimation("idle");
  }

  // ** [UPDATE CHECKS]
  /**
   * Update the movement of the player object if the movement X & Y
   * have value greater > 0.
   *
   * set movementSpeedX/Y to 0 if keys are not longer pressed.
   */
  private updatePlayerMovement() {
    // ** Keep the player moving
    this.getBody().setVelocity(this.movementSpeedX, this.movementSpeedY);
  }

  /**
   * Play a specific animation based on the key provided
   *
   * @param key Name of the animation we want to play
   * @param priority Is this a priority movement?
   */
  private playAnimation(key: string): void {
    !this.anims.isPlaying && this.anims.play(key);
  }
}

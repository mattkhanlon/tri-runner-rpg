import { Actor } from "./Actor";

export class Player extends Actor {
  // ** [PLAYER DEFAULTS]
  private pAtlas: string;
  private pSkin: string = "def";
  private pFacing: string = "down";

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
    texture: string = "player",
  ) {
    super(scene, x, y, texture);

    // ** [PLAYER DEFAULTS]
    this.pAtlas = texture;
    this.pSkin = "def";
    this.pFacing = "down";

    // ** [INIT PLAYER]
    this.initAnimations();
    this.initKeybindings();
  }

  /**
   * Create all required animations
   */
  private initAnimations(): void {
    this.initSimplePlayerAnimations();
    this.initAdvancedPlayerAnimations();
    this.initPlayerCombatAnimations();
    this.initPlayerItemAnimations();
  }

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
      this.pFacing = "up";
      if (!this.IsMoveBlocked)
        this.playAnimation(`${this.pFacing}-${this.pSkin}`);
    }

    // ** Down - movementSpeedY
    if (this.keyDown?.isDown) {
      this.movementSpeedY = this.pMoveSpeed * 0.75;
      this.pFacing = "down";
      if (!this.IsMoveBlocked)
        this.playAnimation(`${this.pFacing}-${this.pSkin}`);
    }

    // ** LEFT - movementSpeedX
    if (this.keyLeft?.isDown) {
      this.movementSpeedX = -this.pMoveSpeed;
      this.pFacing = "left";
      if (!this.IsMoveBlocked)
        this.playAnimation(`${this.pFacing}-${this.pSkin}`);
    }

    // ** Right - movementSpeedX
    if (this.keyRight?.isDown) {
      this.movementSpeedX = this.pMoveSpeed;
      this.pFacing = "right";
      if (!this.IsMoveBlocked)
        this.playAnimation(`${this.pFacing}-${this.pSkin}`);
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
      this.playAnimation(`attack-${this.pFacing}-${this.pSkin}`);
    } else {
      this.isAttacking = false;
    }

    // ** [KEYBINDINGS][ITEMS]
    // ** use Item 1
    if (this.keyItemOne?.isDown) {
      this.play({
        key: "ocarina",
      });
    }
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

    if (!this.isMoving && !this.anims.isPlaying)
      this.setFrame(`${this.pFacing}-${this.pSkin}-1`);
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
  private playAnimation(
    key: string,
    delay: number = 0,
    yoyo: boolean = false,
  ): void {
    !this.anims.isPlaying &&
      this.anims.play({
        key: key,
        delay: delay,
        yoyo: yoyo,
      });
  }

  // ** [INIT ANIMATIONS]
  /**
   * Simple Movement Animations
   *
   * @example walk-right
   * @example walk-left
   * @example walk-up
   * @example walk-down
   */
  private initSimplePlayerAnimations() {
    // ** Player Movement
    this.scene.anims.create({
      key: "right-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "right-def-",
        start: 1,
        end: 7,
      }),
    });

    this.scene.anims.create({
      key: "left-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "left-def-",
        start: 1,
        end: 7,
      }),
    });

    this.scene.anims.create({
      key: "up-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "up-def-",
        start: 1,
        end: 8,
      }),
    });

    this.scene.anims.create({
      key: "down-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "down-def-",
        start: 1,
        end: 8,
      }),
    });

    // ** Player Movement
    this.scene.anims.create({
      key: "up-alt",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "up-alt-",
        start: 1,
        end: 8,
      }),
    });

    this.scene.anims.create({
      key: "down-alt",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "down-alt-",
        start: 1,
        end: 8,
      }),
    });

    this.scene.anims.create({
      key: "left-alt",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "right-alt-",
        start: 1,
        end: 7,
      }),
    });

    this.scene.anims.create({
      key: "right-alt",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "right-alt-",
        start: 1,
        end: 7,
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
  private initAdvancedPlayerAnimations() {
    // advanced mechanics go here
  }

  /**
   * Set up Combat Animations here
   *
   * @example attack
   * @example attack-alt
   */
  private initPlayerCombatAnimations() {
    this.scene.anims.create({
      key: "attack-up-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "attack-up-def-",
        start: 1,
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "attack-down-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "attack-down-def-",
        start: 1,
        end: 6,
      }),
    });

    this.scene.anims.create({
      key: "attack-left-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "attack-left-def-",
        start: 1,
        end: 5,
      }),
    });

    this.scene.anims.create({
      key: "attack-right-def",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "attack-right-def-",
        start: 1,
        end: 5,
      }),
    });
  }

  /**
   * Set up Item animations
   *
   * @example ocarina
   */
  private initPlayerItemAnimations() {
    this.scene.anims.create({
      key: "ocarina",
      frames: this.scene.anims.generateFrameNames(this.pAtlas, {
        prefix: "ocr-play-def-",
        start: 1,
        end: 4,
      }),
      repeat: -1,
      frameRate: 6,
    });
  }
}

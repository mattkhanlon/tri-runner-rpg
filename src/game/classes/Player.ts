import { Input, Scene } from "phaser";
import { Actor } from "./Actor";
import TextureKeys from "../const/TextureKeys";
import ControllerMapKeys from "../const/ControllerMapKeys";
import { PlayerKeys } from "../const/PlayerKeys";
import PlayerConfig from "../config/PlayerConfig";

export class Player extends Actor {
  // ** [The amount we will multiply the movingSpeed by]
  private crouchSpeed: number = 0.45;

  // ** [The gamepad for the Player object]
  private gamePad: Input.Gamepad.Gamepad | undefined;

  // ** [The amount we will multiply the movingSpeed by]
  private sprintSpeed: number = 1.75;

  // ** [GAMEPAD]

  constructor(scene: Scene, playerConfig: PlayerConfig) {
    super(scene, 0, 0, TextureKeys.Player);

    // ** Store the JSON
    this.playerConfig = playerConfig;
    this.movingSpeed = this.baseSpeed;

    // ** Create our sprite animations
    this.createAnimations();
  }

  // ** [INIT]
  /** ****************************
   * Initial the Keybindings for
   * the player
   ** ****************************/
  private initPlayerBindings(): void {
    // ** Listen for a GAMEPAD_BUTTON_DOWN event
    this.gamePad?.on(
      Input.Gamepad.Events.GAMEPAD_BUTTON_DOWN,
      (event: number) => {
        this.checkPlayerButtonOnDown(event);
      },
    );
  }

  // ** [UPDATE]
  /** ****************************
   * Check every frame for a update
   ** ****************************/
  update(): void {
    if (this.gamePad != undefined) {
      this.updatePlayerMovement();
      this.updatePlayerAnimation();
    }
  }

  /** ****************************
   * Update the player animation depending on which
   * state the user is in
   *
   * @example Move=True, Crouch=False, Play 'Run'
   * @example Move=False, isWalkBlocked=False, Play 'Idle'
   ** ****************************/
  private updatePlayerAnimation() {
    // ** Check if we are walking
    if (
      this.isMoving &&
      !this.isAttacking &&
      !this.isWalkBlocked &&
      !this.isJumping &&
      !this.isFalling
    ) {
      this.playAnimation({ key: PlayerKeys.Run });
    }

    // ** If no movement, Play Idle animation
    if (
      !this.isMoving &&
      !this.isWalkBlocked &&
      !this.isJumping &&
      !this.isFalling
    ) {
      this.playAnimation({ key: PlayerKeys.Idle });
    }

    // ** What are we checking for if the player is falling?
    if (this.isFalling) {
      this.playAnimation({ key: PlayerKeys.Fall });

      if (this.body?.velocity.y == 0) {
        this.isFalling = false;
        this.isWalkBlocked = true;
        this.movingSpeedX = 0;
        this.movingSpeedY = 0;
        this.playAnimation({ key: PlayerKeys.Land, duration: 2 });
      }
    }

    this.checkFlip();
  }

  /** ****************************
   * Update the movement of the player
   * object if the movement X & Y
   * have value greater > 0.
   *
   * @example set movingSpeedX/Y to 0 if
   * keys are not longer pressed.
   ** ****************************/
  private updatePlayerMovement() {
    // Stop any previous movement from the last frame

    if (!this.isWalkBlocked) {
      this.movingSpeedX = this.gamePad.leftStick.x * this.movingSpeed;
    }

    // ** Flip the character in the direction we need him
    this.setVelocityX(this.movingSpeedX);

    if (this.isJumping) {
      this.setVelocityY(this.jumpHeight);
    }

    if (this.getBody().velocity.y > 1) {
      this.playAnimation({ key: PlayerKeys.Fall });
      this.isFalling = true;
    }

    if (this.movingSpeedX != 0 || this.movingSpeedY != 0) {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  }

  // ** [CHECKS]
  private checkPlayerButtonOnDown(button: number) {
    switch (button) {
      // ** [ATTACK]
      case ControllerMapKeys.RT:
        this.playerIsAttacking(PlayerKeys.AttackBasic);

        break;
      case ControllerMapKeys.RB:
        this.playerIsAttacking(PlayerKeys.AttackBasicCombo);
        break;
      // ** [JUMP]
      case ControllerMapKeys.A:
        this.playerIsJumping(PlayerKeys.Jump_Up);
        break;
      // ** [SPRINT]
      case ControllerMapKeys.LEFT_CLICK:
        this.playerIsSprinting(PlayerKeys.Run, true);
        break;
      // ** [CROUCH]
      case ControllerMapKeys.RIGHT_CLICK:
        this.playerIsCrouching(PlayerKeys.Run, true);
        break;
      default:
        console.log("No action recored");
        break;
    }
  }

  /**
   * Creates the Animations for the character
   */
  private createAnimations() {
    this.anims.createFromAseprite(TextureKeys.Player_Anim_Run);
    this.anims.createFromAseprite(TextureKeys.Player_Anim_Attack1);
    this.anims.createFromAseprite(TextureKeys.Player_Anim_Attack2);
    this.anims.createFromAseprite(TextureKeys.Player_Anim_Idle);
    this.anims.createFromAseprite(TextureKeys.Player_Anim_Jump);
    this.anims.createFromAseprite(TextureKeys.Player_Anim_Land);

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      (event: AnimationEvent) => {
        this.animationListeners(event);
      },
    );
  }

  // ** [ANIMATIONS]
  /** ****************************
   * Play a specific animation based on the key provided
   *
   * @param key Name of the animation we want to play
   ** ****************************/
  private playAnimation(
    key: Phaser.Types.Animations.PlayAnimationConfig,
  ): void {
    this.stopAnimation(key.key);
    !this.anims.isPlaying && this.anims.play(key);
  }

  /**
   * A spot to work with all listeners depending on the event and key that was fired.
   *
   * @param event The event we fired
   */
  private animationListeners(event: AnimationEvent): void {
    switch (event.key) {
      case PlayerKeys.Jump_Up:
        this.isJumping = false;
        this.isFalling = true;
        break;
      case PlayerKeys.AttackBasic:
        this.isWalkBlocked = false;
        this.isAttacking = false;
        break;
      case PlayerKeys.Land:
        this.isWalkBlocked = false;

        if (!this.jumpAllowed) {
          this.jumpAllowed = true;
        }
        break;
    }
  }

  // ** [ACTION/ITEM/USAGE]
  /** ****************************
   * The below functions are designed to keep
   * action animation/checks/code in their
   * own functions to make it easier to identify
   * and maintain.
   ** ****************************/

  /** ****************************
   * Functionality designed around
   * the player attack
   ** ****************************/
  private playerIsAttacking(animation: string = "") {
    // ** Set Flags on Player
    this.isAttacking = true;
    this.isWalkBlocked = true;
    this.movingSpeedX = 0;
    this.movingSpeedY = 0;

    // ** Player the animation for Attack
    if (!this.isJumping && !this.isFalling)
      this.playAnimation({ key: animation });
  }

  /** ****************************
   * Functionality designed around
   * the player attack
   ** ****************************/
  private playerIsCrouching(animation: string = "", crouched: boolean) {
    if (!this.isCrouched) {
      this.isCrouched = crouched;
    } else {
      this.isCrouched = false;
    }

    // ** Modify the movement speed if we're sprinting
    if (this.isCrouched) {
      // ** Check we are not sprinting
      if (this.isSprinting) this.playerIsSprinting(undefined, false);
      this.movingSpeed = this.baseSpeed * this.crouchSpeed;
      this.playAnimation({ key: animation });
    } else {
      this.movingSpeed = this.baseSpeed;
    }
  }

  /** ****************************
   * Functionality designed around
   * the player attack
   ** ****************************/
  private playerIsJumping(animation: string = "") {
    if (this.jumpAllowed) {
      this.isJumping = true;
      this.jumpAllowed = false;
      this.anims.stop();
      this.anims.play({
        key: animation,
        frameRate: 15,
        repeat: 5,
      });
    }
  }

  /** ****************************
   * Functionality designed around
   * the player attack
   ** ****************************/
  private playerIsSprinting(animation: string = "", sprinting: boolean) {
    if (!this.isSprinting) {
      this.isSprinting = sprinting;
    } else {
      this.isSprinting = false;
    }

    // ** Modify the movement speed if we're sprinting
    if (this.isSprinting) {
      // ** Check we are not crouched
      if (this.isCrouched) this.playerIsCrouching(undefined, false);
      this.movingSpeed = this.baseSpeed * this.sprintSpeed;
      this.playAnimation({ key: animation });
    } else {
      this.movingSpeed = this.baseSpeed / this.sprintSpeed;
    }
  }

  /** ****************************
   * Stop a animation that does not equal the key
   * provided by the Player object
   *
   * @param key Name of the animation we want to play
   ** ****************************/
  private stopAnimation(key: string | Phaser.Animations.Animation): void {
    if (this.anims.currentAnim?.key != key) this.anims.stop();
  }

  // ** [PUBLIC FUNCTIONS]
  getGamePad(): Input.Gamepad.Gamepad | undefined {
    return this.gamePad;
  }

  getPlayerConfig() {
    return this.playerConfig;
  }

  killPlayer() {
    this.isWalkBlocked = true;
    this.movingSpeedX = 0; // ** The current X-axis value
    this.movingSpeedY = 0; // ** The current Y-axis value

    this.play({
      key: PlayerKeys.Hit,
      repeat: 3,
    });
  }

  setGamePad(gamePad: Input.Gamepad.Gamepad | undefined) {
    this.gamePad = gamePad;
    this.initPlayerBindings();
  }
}

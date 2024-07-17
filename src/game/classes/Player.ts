import { Input, Scene } from "phaser";
import { Actor } from "./Actor";
import TextureKeys from "../const/TextureKeys";
import ControllerMapKeys from "../const/ControllerMapKeys";
import { PlayerAnimKeys } from "../const/AnimationsKeys";
import PlayerConfig from "../config/PlayerConfig";

export class Player extends Actor {
  // ** [The amount we will multiply the movingSpeed by]
  private crouchSpeed: number = 0.45;

  // ** [The gamepad for the Player object]
  private gamePad: Input.Gamepad.Gamepad | undefined;

  // ** [The amount we will multiply the movingSpeed by]
  private sprintSpeed: number = 2;

  // ** [GAMEPAD]

  constructor(scene: Scene, playerConfig: PlayerConfig) {
    super(scene, 0, 0, TextureKeys.Player);

    // ** Store the JSON
    this.playerConfig = playerConfig;
    this.movingSpeed = this.baseSpeed;

    // ** Create our sprite animations
    this.anims.createFromAseprite(TextureKeys.Player);
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
      !this.isJumping
    ) {
      this.playAnimation(PlayerAnimKeys.Run);
    }

    // ** If no movement, Play Idle animation
    if (!this.isMoving && !this.isWalkBlocked && !this.isJumping) {
      this.playAnimation(PlayerAnimKeys.Idle);
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
      this.movingSpeedY = this.gamePad.leftStick.y * this.movingSpeed;
    }

    // ** Flip the character in the direction we need him
    this.getBody().setVelocity(this.movingSpeedX, this.movingSpeedY);
    //this.getBody().velocity.normalize().scale(5);

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
        this.playerIsAttacking(PlayerAnimKeys.AttackBasic);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.playerIsAttacking(PlayerAnimKeys.AttackBasicCombo);
        });
        break;
      // ** [JUMP]
      case ControllerMapKeys.A:
        this.playerIsJumping(PlayerAnimKeys.Jump);
        break;
      // ** [SPRINT]
      case ControllerMapKeys.LEFT_CLICK:
        this.playerIsSprinting(PlayerAnimKeys.Run, true);
        break;
      // ** [CROUCH]
      case ControllerMapKeys.RIGHT_CLICK:
        this.playerIsCrouching(PlayerAnimKeys.Run, true);
        break;
      default:
        console.log("No action recored");
        break;
    }
  }

  // ** [ANIMATIONS]
  /** ****************************
   * Play a specific animation based on the key provided
   *
   * @param key Name of the animation we want to play
   ** ****************************/
  private playAnimation(key: string): void {
    this.stopAnimation(key);
    !this.anims.isPlaying && this.anims.play(key);
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
    if (!this.isJumping) this.playAnimation(animation);

    // ** Once the animation is finished, lets clean up
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.isWalkBlocked = false;
      this.isAttacking = false;
    });
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
      this.playAnimation(animation);
    } else {
      this.movingSpeed = this.baseSpeed;
    }
  }

  /** ****************************
   * Functionality designed around
   * the player attack
   ** ****************************/
  private playerIsJumping(animation: string = "") {
    this.isJumping = true;
    this.playAnimation(animation);

    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.playAnimation(PlayerAnimKeys.Fall);
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isJumping = false;
      });
    });
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
      this.playAnimation(animation);
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
  private stopAnimation(key: string): void {
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
      key: PlayerAnimKeys.Hit,
      repeat: 3,
    });
  }

  setGamePad(gamePad: Input.Gamepad.Gamepad | undefined) {
    this.gamePad = gamePad;
    this.initPlayerBindings();
  }
}

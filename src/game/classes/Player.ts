import { Input, Scene } from "phaser";
import { Actor } from "./Actor";
import { PlayerAnimationsKeys } from "../const/AnimationsKeys";
import ControllerMappingKeys from "../const/ControllerMappingKeys";
import TextureKeys from "../const/TextureKeys";

/**
 * Define the JSON Config
 */
interface PlayerJSON {
  player: {
    health: number;
    startX: number;
    startY: number;
    equipment: Array<string>;
  };
}

export class Player extends Actor {
  // ** [CONFIGS]
  private playerJson: PlayerJSON;

  // ** [PLAYER PROPERTIES]
  // private LEFT_STICK_DEADZONE: number = 0.02; // ** Left stick deadzones
  // private RIGHT_STICK_DEADZONE: number = 0.02; // ** Right stick deadzones
  private movementSpeed: number = 100; // ** The amount we will multiply the Left Stick axis by
  private sprintSpeed: number = 2; // ** The amount we will multiply the movementSpeed by
  private crouchSpeed: number = 0.45; // ** The amount we will multiply the movementSpeed by
  private movementSpeedX: number = 0; // ** The current X-axis value
  private movementSpeedY: number = 0; // ** The current Y-axis value

  // ** [PLAYER FLAGS]
  protected isMoving: boolean = false;
  protected isWalkBlocked: boolean = false;
  protected isSprinting: boolean = false;
  protected isAttacking: boolean = false;
  protected isCrouched: boolean = false;
  protected isJumping: boolean = false;

  // ** [GAMEPAD]
  private gamePad: Input.Gamepad.Gamepad | undefined;

  constructor(scene: Scene, playerConfig: PlayerJSON) {
    super(
      scene,
      playerConfig[TextureKeys.Player].startX,
      playerConfig[TextureKeys.Player].startY,
      TextureKeys.Player,
    );

    // ** Store the JSON
    this.playerJson = playerConfig;

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

  // ** [UPDATE CHECKS]
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
   * Update the movement of the player
   * object if the movement X & Y
   * have value greater > 0.
   *
   * @example set movementSpeedX/Y to 0 if
   * keys are not longer pressed.
   ** ****************************/
  private updatePlayerMovement() {
    this.movementSpeedX = this.gamePad.leftStick.x * this.movementSpeed;
    this.movementSpeedY = this.gamePad.leftStick.y * this.movementSpeed;

    // ** Flip the character in the direction we need him
    this.getBody().setVelocity(this.movementSpeedX, this.movementSpeedY);

    if (this.movementSpeedX != 0 || this.movementSpeedY != 0)
      this.isMoving = true;
    else {
      this.isMoving = false;
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
      this.playAnimation(PlayerAnimationsKeys.Run);
    }

    // ** If no movement, Play Idle animation
    if (!this.isMoving && !this.isWalkBlocked && !this.isJumping) {
      this.playAnimation(PlayerAnimationsKeys.Idle);
    }
    this.checkFlip();
  }

  // ** [PLAYER CHECKS]
  private checkPlayerButtonOnDown(button: number) {
    switch (button) {
      // ** [ATTACK]
      case ControllerMappingKeys.RT:
        this.playerIsAttacking(PlayerAnimationsKeys.AttackBasic);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.playerIsAttacking(PlayerAnimationsKeys.AttackBasicCombo);
        });
        break;
      // ** [JUMP]
      case ControllerMappingKeys.A:
        this.playerIsJumping(PlayerAnimationsKeys.Jump);
        break;
      // ** [SPRINT]
      case ControllerMappingKeys.LEFT_CLICK:
        this.playerIsSprinting(PlayerAnimationsKeys.Run, true);
        break;
      // ** [CROUCH]
      case ControllerMappingKeys.RIGHT_CLICK:
        this.playerIsCrouching(PlayerAnimationsKeys.Run, true);
        break;
      default:
        console.log("No action recored");
        break;
    }
  }

  // ** [PLAYER ACTION/ITEM/USAGE]
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
    this.movementSpeedX = 0;
    this.movementSpeedY = 0;

    // ** Player the animation for Attack
    if (!this.isJumping) this.playAnimation(animation);

    // ** Once the animation is finished, lets clean up
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.isWalkBlocked = false;
      this.isAttacking = false;
    });
  }

  private playerIsJumping(animation: string = "") {
    this.isJumping = true;
    this.playAnimation(animation);

    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.playAnimation(PlayerAnimationsKeys.Fall);
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isJumping = false;
      });
    });
  }

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
      this.movementSpeed = this.movementSpeed * this.sprintSpeed;
      this.playAnimation(animation);
    } else {
      this.movementSpeed = this.movementSpeed / this.sprintSpeed;
    }
  }

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
      this.movementSpeed = this.movementSpeed * this.crouchSpeed;
      this.playAnimation(animation);
    } else {
      this.movementSpeed = this.movementSpeed / this.crouchSpeed;
    }
  }

  // ** [PLAYER ANIMATIONS]
  /** ****************************
   * Play a specific animation based on the key provided
   *
   * @param key Name of the animation we want to play
   ** ****************************/
  private playAnimation(key: string): void {
    this.stopAnimation(key);
    !this.anims.isPlaying && this.anims.play(key);
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

  // ** [GETTERS/SETTERS]
  setGamePad(gamePad: Input.Gamepad.Gamepad | undefined) {
    this.gamePad = gamePad;
    this.initPlayerBindings();
  }

  getGamePad(): Input.Gamepad.Gamepad | undefined {
    return this.gamePad;
  }

  killPlayer() {
    this.isWalkBlocked = true;
    this.movementSpeedX = 0; // ** The current X-axis value
    this.movementSpeedY = 0; // ** The current Y-axis value

    this.play({
      key: PlayerAnimationsKeys.Hit,
      repeat: 3,
    });
  }

  savePlayerObject() {
    return this.playerJson;
  }
}

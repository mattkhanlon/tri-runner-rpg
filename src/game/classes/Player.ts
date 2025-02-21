import { Input, Scene } from "phaser";
import { Actor } from "./Actor";
import ControllerMapKeys from "../const/ControllerMapKeys";
import { PlayerKeys } from "../const/PlayerKeys";
import PlayerInterface from "../interfaces/PlayerInterface";

export class Player extends Actor {
    // ** [The player config is stored here on load]
    protected playerConfig: PlayerInterface;

    // ** The gamepad object for this player
    gamePad: Input.Gamepad.Gamepad;

    constructor(scene: Scene, playerConfig: PlayerInterface) {
        super(scene, 0, 0, PlayerKeys.Player);

        // ** Store the JSON
        this.playerConfig = playerConfig;

        // ** Create our sprite animations
        this.createAnimations();

        // ** Always start with the idle animation
        this.play({ key: PlayerKeys.Idle, repeat: -1 });
    }

    // ** [UPDATE]
    update(): void {
        this.playerIdle();
        this.playerMove();
        this.playerFalling();
        this.checkFlip();
    }

    // ** [PROTECTED/PUBLIC FUNCTIONS]
    /**
     * Plays an animation.
     *
     * @param animOps The animation options to play with
     */
    protected playAnimation(
        animOps: Phaser.Types.Animations.PlayAnimationConfig,
    ): void {
        if (this.anims.currentAnim?.key !== animOps.key) {
            this.play(animOps);
        }
    }

    /**
     * The default animation listener for the player. This is called whenever the player
     * animation changes.
     *
     * @param event The animation event that triggered the listener
     */
    protected playerAnimationListener(
        event: Phaser.Animations.Animation,
    ): void {
        switch (event.key) {
            default:
                break;
        }
    }

    /**
     * The default input listener for the player. This is called whenever the player
     * has gamepad focus and a button is pressed.
     *
     * IMPLEMENTED
     * Jump: playerJump()
     * AttackBasic: playerAttack(PlayerKeys.AttackBasic)
     *
     * @param event The event that triggered the listener. The event is the id/index of the button that was pressed
     */
    public playerInputListener(event: typeof Input.Gamepad.Events): void {
        switch (event) {
            case ControllerMapKeys.A:
                this.playerJump();
                break;
            case ControllerMapKeys.X:
                this.playerAttack(PlayerKeys.AttackBasic);
                break;
            default:
                break;
        }
    }

    /**
     * Sets the gamepad for the player
     *
     * @param gamePad The gamepad object used to control the player
     */
    public setPlayerGamePad(gamePad: Input.Gamepad.Gamepad): void {
        this.gamePad = gamePad;
    }

    // ** [PRIVATE FUNCTIONS]
    /** ****************************
     * Update the movement of the player
     * object if the movement X & Y
     * have value greater > 0.
     *
     * @example set movingSpeedX/Y to 0 if
     * keys are not longer pressed.
     ** ****************************/
    private playerMove(): void {
        if (this.gamePad != undefined) {
            this.movingSpeedX = this.gamePad?.leftStick.x * this.baseSpeed;

            if (this.movingSpeedX != 0 || this.movingSpeedY != 0) {
                this.isMoving = true;
            } else {
                this.isMoving = false;
            }

            if (this.isMoving && !this.isJumping && !this.isFalling) {
                this.playAnimation({ key: PlayerKeys.Run, repeat: -1 });
            }

            // ** Flip the character in the direction we need him
            this.setVelocityX(this.movingSpeedX);
        }
    }

    /**
     * Checks for when the player Idle animation should play
     */
    private playerIdle(): void {
        if (!this.isMoving && !this.isJumping && !this.isFalling) {
            this.playAnimation({ key: PlayerKeys.Idle, repeat: -1 });
        }
    }

    /**
     * Checks for when the player is falling
     */
    private playerFalling(): void {
        // ** Check if we're falling and set it to true
        if (this.body?.velocity.y > 0.01) {
            this.isFalling = true;
            this.playAnimation({ key: PlayerKeys.Fall, repeat: -1 });
        }

        // ** Check if we've stopped falling, play landing if needed
        if (this.body?.velocity.y == 0) {
            if (this.isFalling) {
                this.isFalling = false;
                this.playAnimation({ key: PlayerKeys.Land, repeat: -1 });
            }
            this.jumpAllowed = true;
            this.doubleJump = true;
        }
    }

    /**
     * Performs the jump action if allowed for a player object
     */
    private playerJump(): void {
        if (this.doubleJump && !this.jumpAllowed) {
            this.doubleJump = false;
            this.jumpAllowed = true;
        }

        if (this.jumpAllowed && !this.isJumping) {
            this.isJumping = true;
            this.jumpAllowed = false;
            this.setVelocityY(this.jumpHeight);
            this.playAnimation({ key: PlayerKeys.Jump_Up, repeat: 0 });

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.playAnimation({ key: PlayerKeys.Jump, repeat: -1 });
            });

            const checkJumpState = () => {
                if (!this.gamePad.A) {
                    this.isFalling = true;
                    this.isJumping = false;
                    this.playAnimation({ key: PlayerKeys.Fall, repeat: -1 });
                    this.scene.events.off("update", checkJumpState);
                }
            };

            this.scene.events.on("update", checkJumpState);
        }
    }

    /**
     * Performs the attack action if allowed for a player object
     * @param attack The attack to perform
     */
    private playerAttack(attack: PlayerKeys): void {
        if (!this.isAttackBlocked) {
            this.playAnimation({
                key: attack,
                repeat: 0,
            });
            this.isAttacking = true;
            this.isAttackBlocked = true;
            this.jumpAllowed = false;
            this.doubleJump = false;

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.isAttacking = false;
                this.isAttackBlocked = false;
                this.jumpAllowed = true;
                this.doubleJump = true;
            });
        }
    }

    /**
     * Creates the Animations for the character
     */
    private createAnimations(): void {
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Run);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Attack1);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Attack2);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Idle);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Jump);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Land);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Walk);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Attack3);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Punch_Jab);
        this.anims.createFromAseprite(PlayerKeys.Player_Aseprite_Punch_Cross);

        // ** Listen for when a animation stops
        this.on(
            Phaser.Animations.Events.ANIMATION_STOP,
            (event: Phaser.Animations.Animation) => {
                this.playerAnimationListener(event);
            },
        );

        // ** Listen for when a animation Completes
        this.on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            (event: Phaser.Animations.Animation) => {
                this.playerAnimationListener(event);
            },
        );
    }
}

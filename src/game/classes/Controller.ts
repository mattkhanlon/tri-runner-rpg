import { Input } from "phaser";
import { Player } from "./Player";

export class Controller extends Phaser.Input.Gamepad.Gamepad {
    // ** The gamepad object for this controller
    readonly gamePad: Phaser.Input.Gamepad.Gamepad;

    constructor(
        manager: Phaser.Input.Gamepad.GamepadPlugin,
        pad: Phaser.Types.Input.Gamepad.Pad,
    ) {
        super(manager, pad);

        this.gamePad = manager.getPad(pad.index);
    }

    /**
     * Confiugured the gamepad to work with the player, setting up the input listeners
     *
     * @param player The player object to set up our controller with
     */
    configurePlayerControls(player: Player) {
        this.gamePad.on(
            Input.Gamepad.Events.GAMEPAD_BUTTON_DOWN,
            (event: typeof Input.Gamepad.Events) => {
                player.playerInputListener(event);
            },
        );

        player.setPlayerGamePad(this.gamePad);
    }
}

import { Input } from "phaser";
import { Player } from "./Player";

export class Controller extends Phaser.Input.Gamepad.Gamepad {
    readonly gamePad: Phaser.Input.Gamepad.Gamepad;

    constructor(
        manager: Phaser.Input.Gamepad.GamepadPlugin,
        pad: Phaser.Types.Input.Gamepad.Pad,
    ) {
        super(manager, pad);

        this.gamePad = manager.getPad(pad.index);
    }

    configurePlayerControls(player: Player) {
        console.log(this.gamePad);
        this.gamePad.on(
            Input.Gamepad.Events.GAMEPAD_BUTTON_DOWN,
            (event: typeof Input.Gamepad.Events) => {
                player.playerInputListener(event);
            },
        );

        player.setPlayerGamePad(this.gamePad);
    }
}

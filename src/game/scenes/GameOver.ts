import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import SceneKeys from "../const/SceneKeys";
import PlayerFactory from "../factory/PlayerFactory";
import { PlayerKeys } from "../const/PlayerKeys";

export class GameOver extends Scene {
    // ** [VARIABLES]
    title: GameObjects.Text;
    player: GameObjects.Sprite;

    constructor() {
        super("GameOver");
    }

    // ** [CREATE]
    create() {
        this.createScreen();

        EventBus.emit("current-scene-ready", this);
    }

    /** ***********************************************
     ** Create the starting screen before moving to the
     ** game screen
     *
     *  @todo Add menu options
     ** **********************************************/
    createScreen() {
        // ** Add a Player Model w/ Idle animation playing
        this.player = PlayerFactory.createPlayer(
            this,
            this.cache.json.get(PlayerKeys.Player_JSON_Name),
        );

        // ** Get the player to activate the controller
        const text = this.add.text(
            this.player.x - 40,
            this.player.y + 50,
            "You died",
            {
                font: "16px Courier",
            },
        );

        // ** Play PlayerKeys.Idle animation
        this.player.play(PlayerKeys.Idle);

        // ** Play PlayerKeys.Hit animation
        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.player.play(PlayerKeys.Death);

            // ** Play PlayerKeys.Death animation
            this.player.once(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                () => {
                    text.destroy();
                    this.changeScene();
                },
            );
        });
    }

    changeScene() {
        this.scene.start(SceneKeys.MainMenu);
    }
}


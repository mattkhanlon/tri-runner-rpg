import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import SceneKeys from "../const/SceneKeys";
import PlayerFactory from "../factory/PlayerFactory";
import TextureKeys from "../const/TextureKeys";
import { PlayerKeys } from "../const/PlayerKeys";

export class MainMenu extends Scene {
  // ** [VARIABLES]
  title: GameObjects.Text;
  player: GameObjects.Sprite;

  constructor() {
    super("MainMenu");
  }

  // ** [CREATE]
  create() {
    this.createScreen();

    this.matter.world.disableGravity();

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
      this.cache.json.get(TextureKeys.PlayerJSON),
    );

    this.player.setX(this.scale.canvas.width / 2);
    this.player.setY(this.scale.canvas.height / 2);
    this.player.play({
      key: PlayerKeys.Idle,
      repeat: -1,
    });

    // ** Get the player to activate the controller
    const text = this.add.text(
      this.player.x - 125,
      this.player.y + 50,
      "Press any button to continue.",
      { font: "16px Courier" },
    );

    console.log(this.input.gamepad?.gamepads);
    // ** Add a listener for the Gamepad
    this.input.gamepad?.once(
      "connected",
      () => {
        // ** [INIT PLAYER]
        text.destroy();
        this.changeScene();
      },
      this,
    );
  }

  // ** [UPDATE]
  update() {}

  /** ***********************************************
   ** Change the scene
   *
   *  @todo Move keybings to external config
   *  @binding {enter} - Click enter to mave to the next screen
   ** **********************************************/
  changeScene() {
    this.scene.start(SceneKeys.Game);
  }
}

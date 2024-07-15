import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import SceneKeys from "../const/SceneKeys";
import PlayerFactory from "../factory/PlayerFactory";
import TextureKeys from "../const/TextureKeys";

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

    // Annouce we are ready
    EventBus.emit("current-scene-ready", this);
  }

  /** ***********************************************
   ** Create the starting screen before moving to the
   ** game screen
   *
   *  @todo Add menu options
   ** **********************************************/
  createScreen() {
    // this.title = this.add
    //   .text(512, 220, "VOYAGE", {
    //     fontFamily: "Arial Black",
    //     fontSize: 72,
    //     color: "#000000",
    //     stroke: "#ffffff",
    //     strokeThickness: 2,
    //     align: "center",
    //   })
    //   .setOrigin(0.5)
    //   .setDepth(100);

    // ** Add a Player Model w/ Idle animation playing
    this.player = PlayerFactory.createPlayer(
      this,
      this.cache.json.get(TextureKeys.PlayerJSON),
    );

    this.player.play({
      key: "Idle",
      repeat: -1,
    });

    // ** Get the player to activate the controller
    const text = this.add.text(
      this.player.x * 0.75,
      this.player.y + 50,
      "Press any button to continue.",
      { font: "16px Courier" },
    );

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

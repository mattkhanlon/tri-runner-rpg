import { EventBus } from "../EventBus";
import { Cameras, GameObjects, Scene, Input } from "phaser";
import SceneKeys from "../const/SceneKeys";
import { Player } from "../classes/Player";
import PlayerFactory from "../factory/PlayerFactory";
import ControllerMappingKeys from "../const/ControllerMappingKeys";
import { PlayerAnimationsKeys } from "../const/AnimationsKeys";

export class Game extends Scene {
  // ** [VARIABLES]
  camera: Cameras.Scene2D.Camera;
  background: GameObjects.Image;
  gameText: GameObjects.Text;
  player: Player;

  constructor() {
    super(SceneKeys.Game);
  }

  // ** [CREATE]
  create() {
    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.25);

    //** Enable the HUD */
    this.createPlayer();
    this.createHUD();

    // ** Listen for a GAMEPAD_BUTTON_DOWN event
    this.player
      .getGamePad()
      .on(Input.Gamepad.Events.GAMEPAD_BUTTON_DOWN, (event: number) => {
        console.log(event);
        switch (event) {
          case ControllerMappingKeys.BACK:
            this.player.killPlayer();

            this.player.once(
              Phaser.Animations.Events.ANIMATION_COMPLETE,
              () => {
                this.changeScene();
              },
            );
            break;
        }
      });

    EventBus.emit("current-scene-ready", this);
  }

  /**
   * Create the Player object into the scene
   */
  createPlayer() {
    // ** Add a Player Model w/ Idle animation playing
    this.player = PlayerFactory.createPlayer(
      this,
      this.cache.json.get("player_json"),
    );
    this.player.setGamePad(this.input.gamepad?.getPad(0));
  }

  /** ***********************************************
   ** Creates the player HUD
   *
   ** **********************************************/
  createHUD() {
    this.gameText = this.add
      .text(50, 758, "work in progress", {
        fontFamily: "Arial Black",
        fontSize: 10,
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(100);

    // ** Set up the camera
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00000f);
    this.cameras.main.startFollow(this.player, true);
  }

  // ** [UPDATE]
  update() {
    this.player.update();
  }

  /** ***********************************************
   ** Change the scene
   *
   *  @todo Move keybings to external config
   *  @binding {enter} - Click enter to mave to the next screen
   ** **********************************************/
  changeScene() {
    this.scene.start(SceneKeys.GameOver);
  }
}

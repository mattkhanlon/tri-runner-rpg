import { EventBus } from "../EventBus";
import { Cameras, GameObjects, Scene } from "phaser";
import SceneKeys from "../const/SceneKeys";
import { Player } from "../classes/Player";
import { Level } from "../classes/Level";
import PlayerFactory from "../factory/PlayerFactory";
import TextureKeys from "../const/TextureKeys";
import LevelFactory from "../factory/LevelFactory";

export class Game extends Scene {
  // ** [VARIABLES]
  camera: Cameras.Scene2D.Camera;
  background: GameObjects.Image;
  gameText: GameObjects.Text;
  player: Player;
  level: Level;

  constructor() {
    super(SceneKeys.Game);
  }

  // ** [CREATE]
  create() {
    this.camera = this.cameras.main;

    //** Enable the HUD */

    // ** Create the layers up to the base layer
    this.createLevelLayers(TextureKeys.Level_0_Config);

    // ** Create the player next
    this.createPlayer();

    this.createCamera();

    // ** Add the Top Environment Layer
    this.level.finalizeLevelCreation();
  }

  createCamera() {
    // ** Config the comera to the player
    this.camera.setZoom(3);
    this.camera.setBounds(
      0,
      0,
      this.level.map.widthInPixels,
      this.level.map.heightInPixels,
    );
    this.camera.startFollow(this.player, true);

    EventBus.emit("current-scene-ready", this);
  }

  createLevelLayers(level: string) {
    this.level = LevelFactory.createLevel(this, this.cache.json.get(level));
    this.level.create();
  }

  /**
   * Create the Player object into the scene
   */
  createPlayer() {
    // ** Add a Player Model w/ Idle animation playing
    this.player = PlayerFactory.createPlayer(
      this,
      this.cache.json.get(TextureKeys.PlayerJSON),
    );
    this.player.setGamePad(this.input.gamepad?.getPad(0));

    // ** position the player
    this.player.x = this.level.spawnPoint.x;
    this.player.y = this.level.spawnPoint.y;
  }

  /** ***********************************************
   ** Creates the player HUD
   *
   ** **********************************************/
  createHUD() {
    // ** Set up the camera
  }

  // ** [UPDATE]
  update() {
    this.player.update();
    this.level.update(this.player);
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

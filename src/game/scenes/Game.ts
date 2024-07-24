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
  world: Phaser.Physics.Matter.World;
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
    this.world = this.matter.world;
    this.camera = this.cameras.main;
    //** Enable the HUD */

    // ** Create the layers up to the base layer

    //this.world.disableGravity();
    this.createLevelLayers(TextureKeys.Level_0_Config);
    this.world.setBounds(this.level.maxWidth, this.level.maxHeight + 100);

    // ** Create the player next
    this.createPlayer();

    // ** set up the camera
    this.createCamera();
    this.camera.setZoom(1.65);

    // ** Add the Top Environment Layer
    EventBus.emit("current-scene-ready", this);
  }

  /**
   * Creates the camera allowing it
   * to follow the player, setting some
   * offsets as well.
   */
  createCamera() {
    this.camera.startFollow(this.player, true, 0.1, 0.1, 0, 150);
    this.camera.setZoom(1.75);
  }

  /**
   * Creates the Level
   *
   * @param level The level we want to load
   */
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
    this.player.y = this.level.spawnPoint.y - 25;
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
    //this.level.update(this.player);
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

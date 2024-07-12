import { EventBus } from "../EventBus";
import { Cameras, GameObjects, Scene } from "phaser";
import { Player } from "../classes/Player";

export class Game extends Scene {
  camera: Cameras.Scene2D.Camera;
  background: GameObjects.Image;
  gameText: GameObjects.Text;

  private player!: GameObjects.Sprite;

  // ** VARIABLES
  private keyEscape: Phaser.Input.Keyboard.Key | undefined;

  constructor() {
    super("Game");
  }

  create() {
    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    //** Add the player */
    this.player = new Player(this, 500, 384);

    //** Enable the HUD */
    this.enableHUD();

    //** Keybeindings */
    this.keyEscape = this.input.keyboard?.addKey("Escape");

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.player.update();
    this.keybindings();
  }

  changeScene() {
    this.scene.start("GameOver");
  }

  /** ***********************************************
   ** ***********************************************
   ** Enables the player HUD
   *
   ** **********************************************/
  enableHUD() {
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
    this.camera.setBackgroundColor(0x00ff00);
    this.camera.scaleManager.setZoom(1.25);
    this.cameras.main.startFollow(this.player, true);
  }

  /** ***********************************************
   ** ***********************************************
   ** Create the Keybindings Required for this page.
   *
   *  @todo Move keybings to external config
   ** **********************************************/
  keybindings() {
    if (this.keyEscape?.isDown) {
      this.changeScene();
    }
  }
}

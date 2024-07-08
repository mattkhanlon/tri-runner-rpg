import { GameObjects, Scene, Input } from "phaser";
import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  // ** VARIABLES
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  subTitle: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

  // ** KEY BINDNGS
  private keySwitchScenes: Input.Keyboard.Key | undefined;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.displayTitle();

    this.keySwitchScenes = this.input.keyboard?.addKey("Enter");
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.keybindings();
  }

  /** ***********************************************
   ** ***********************************************
   ** Change the scene
   *
   *  @todo Move keybings to external config
   *  @binding {enter} - Click enter to mave to the next screen
   ** **********************************************/
  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    // Disable the keyboard for this scene
    this.scene.start("Game");
  }

  /** ***********************************************
   ** ***********************************************
   ** Display the titie screen and all details
   *
   *  @todo Update logo
   *  @todo Add menu options
   ** **********************************************/
  displayTitle() {
    this.background = this.add.image(512, 384, "background");

    this.logo = this.add.image(512, 300, "logo").setDepth(100);

    this.title = this.add
      .text(512, 460, "Tri Runner RPG", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    this.subTitle = this.add
      .text(512, 510, "Work in progress", {
        fontFamily: "Arial Black",
        fontSize: 26,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);
  }

  /** ***********************************************
   ** ***********************************************
   ** Create the Keybindings Required for this page.
   *
   *  @todo Move keybings to external config
   *  @binding {enter} - Click enter to mave to the next screen
   ** **********************************************/
  keybindings() {
    if (this.keySwitchScenes?.isDown) {
      this.changeScene();
    }
  }
}

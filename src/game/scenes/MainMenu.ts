import { GameObjects, Scene, Input } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  subTitle: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

  // ** KEY BINDNGS
  switchScenes: Input.Keyboard.Key;

  constructor() {
    super("MainMenu");
  }

  create() {
    EventBus.emit("current-scene-ready", this);

    this.displayTitle();
    this.createKeybindings();
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

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

  moveLogo(vueCallback: ({ x, y }: { x: number; y: number }) => void) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
        y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (vueCallback) {
            vueCallback({
              x: Math.floor(this.logo.x),
              y: Math.floor(this.logo.y),
            });
          }
        },
      });
    }
  }

  /** ***********************************************
   ** ***********************************************
   ** Create the Keybindings Required for this page.
   *
   *  @todo Move keybings to external config
   ** **********************************************/
  createKeybindings() {
    this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "enter":
          this.changeScene();
          break;
        default:
          console.log(event);
          break;
      }
    });
  }
}

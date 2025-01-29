import Phaser from "phaser";

/**
 * MainMenu scene for the game.
 * This scene displays the main menu options for starting the game.
 */
export class MainMenu extends Phaser.Scene {
  /**
   * The title text object.
   */
  private title!: Phaser.GameObjects.Text;

  /**
   * The sub-title text object.
   */
  private subTitle!: Phaser.GameObjects.Text;

  /**
   * Creates the MainMenu scene.
   */
  constructor() {
    super("MainMenu");
  }

  /**
   * Initializes the scene.
   */
  create(): void {
    this.createBackground();
    this.createTitle();
    this.createSubTitle();
  }

  /**
   * Creates the background for the MainMenu.
   */
  private createBackground(): void {
    this.cameras.main.setBackgroundColor("#000000");
  }

  /**
   * Creates the title text for the MainMenu.
   */
  private createTitle(): void {
    const centerX = this.cameras.main.width / 2;

    this.title = this.add
      .text(centerX, 150, "<Unknown>", {
        fontFamily: "Courier",
        fontSize: "22px",
        fontStyle: "500",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }

  /**
   * Creates the sub-title text for the MainMenu.
   */
  private createSubTitle(): void {
    const centerX = this.cameras.main.width / 2;
    const titleBottom = this.title.y + this.title.height / 2;

    this.subTitle = this.add
      .text(centerX, titleBottom + 10, "...walk into the beginning...", {
        fontFamily: "Courier",
        fontSize: "12px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0);
  }
}

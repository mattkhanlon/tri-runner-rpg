import Phaser from "phaser";
import SceneKeys from "../const/SceneKeys";

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
        this.createStartPrompt();
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

    /**
     * Creates the start prompt for the MainMenu.
     */
    private createStartPrompt(): void {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const startText = this.add
            .text(centerX, centerY + 50, "Press any button to continue...", {
                fontFamily: "Courier",
                fontSize: "16px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 1000,
            ease: "Power1",
            yoyo: true,
            repeat: -1,
        });

        this.input.gamepad?.once("connected", (pad) => {
            pad.on("down", () => this.scene.start(SceneKeys.Game));
        });
        this.input.on("pointerdown", () => this.scene.start(SceneKeys.Game));
    }
}


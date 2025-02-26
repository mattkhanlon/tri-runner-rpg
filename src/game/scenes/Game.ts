import { EventBus } from "../EventBus";
import { Cameras, GameObjects, Scene } from "phaser";
import SceneKeys from "../const/SceneKeys";
import PlayerFactory from "../factory/PlayerFactory";
import LevelKeys from "../const/LevelKeys";
import LevelFactory from "../factory/LevelFactory";
import PlayerKeys from "../const/PlayerKeys";
import { Level } from "../classes/Level";
import { Player } from "../classes/Player";
import { Controller } from "../classes/Controller";

export class Game extends Scene {
    // ** [VARIABLES]
    world: Phaser.Physics.Matter.World;
    camera: Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    gameText: GameObjects.Text;
    player: Player;
    level: Level;
    controller: Controller;

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
        this.createLevel(LevelKeys.Level_0_Config);

        // ** Create the player next
        this.createPlayer();

        // ** set up the camera
        this.configureCamera();

        // ** Configure the gamepad
        this.configureGamepad();

        // ** Add the Top Environment Layer
        EventBus.emit("current-scene-ready", this);
    }

    /**
     * Creates the Level
     *
     * @param level The level we want to load
     */
    createLevel(level: string) {
        this.level = LevelFactory.createLevel(this, this.cache.json.get(level));
        this.level.create();

        // Get the boundries for the world
        this.world.setBounds(
            0,
            0,
            this.level.maxWidth,
            this.level.maxHeight + 100,
        );
    }

    /**
     * Create the Player object into the scene
     */
    createPlayer() {
        // ** Add a Player Model w/ Idle animation playing
        this.player = PlayerFactory.createPlayer(
            this,
            this.cache.json.get(PlayerKeys.Player_JSON_Name),
        );

        // ** Place the player at the spawn point
        this.level.placePlayer(this.player);
    }

    /**
     * Creates the camera allowing it
     * to follow the player, setting some
     * offsets as well.
     */
    configureCamera() {
        this.camera.setBounds(
            0,
            0 - 16,
            this.level.maxWidth,
            this.level.maxHeight,
            true,
        );
        this.camera.setZoom(7.5);
        this.camera.startFollow(this.player, false, 1, 1, 0, 0);
        //this.configureCameraMask();
    }

    /**
     * Set up the gamepad to work with the current scene
     */
    configureGamepad() {
        this.input.gamepad?.once(
            "connected",
            (pad: Phaser.Input.Gamepad.Gamepad) => {
                this.controller = new Controller(this.input.gamepad!, pad);
                this.controller.configurePlayerControls(this.player);
            },
            this,
        );
    }

    /**
     *
     */
    configureCameraMask() {
        // Create a circular mask that follows the player
        const maskGraphics = this.make.graphics({
            x: 0,
            y: 0,
        });
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillCircle(0, 0, 400); // Adjust the radius as needed

        const mask = maskGraphics.createGeometryMask();

        // Apply the mask to the level
        this.camera.setMask(mask);

        // Update mask position in the scene's update method
        this.events.on("update", () => {
            maskGraphics.x = this.camera.zoomX;
            maskGraphics.y = this.camera.zoomY;
        });
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


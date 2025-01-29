import SceneKeys from "../const/SceneKeys";
import TextureKeys from "../const/TextureKeys";
import PlayerKeys from "../const/PlayerKeys";
import LevelKeys from "../const/LevelKeys";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        // ** [LOAD TEXTURES]
        this.load.image(
            TextureKeys.tx_Level_0_name,
            TextureKeys.tx_Level_0_path,
        );

        // ** [LOAD LEVELS]
        this.load.image(
            LevelKeys.Level_0_Image_Name,
            LevelKeys.Level_0_Image_Path,
        );

        this.load.image(
            LevelKeys.Level_0_Image_Name,
            LevelKeys.Level_0_Image_Path,
        );

        this.load.tilemapTiledJSON(
            LevelKeys.Level_0_JSON_Name,
            LevelKeys.Level_0_JSON_Path,
        );

        this.load.json(LevelKeys.Level_0_Config, LevelKeys.Level_0_Config_Path);

        this.load.tilemapTiledJSON(
            LevelKeys.Level_0_JSON_Name,
            LevelKeys.Level_0_JSON_Path,
        );

        // ** [LOAD PLAYER]
        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Run,
            PlayerKeys.Player_Aseprite_Run_Image,
            PlayerKeys.Player_Aseprite_Run_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Attack1,
            PlayerKeys.Player_Aseprite_Attack1_Image,
            PlayerKeys.Player_Aseprite_Attack1_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Attack2,
            PlayerKeys.Player_Aseprite_Attack2_Image,
            PlayerKeys.Player_Aseprite_Attack2_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Idle,
            PlayerKeys.Player_Aseprite_Idle_Image,
            PlayerKeys.Player_Aseprite_Idle_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Jump,
            PlayerKeys.Player_Aseprite_Jump_Image,
            PlayerKeys.Player_Aseprite_Jump_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Land,
            PlayerKeys.Player_Aseprite_Land_Image,
            PlayerKeys.Player_Aseprite_Land_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Walk,
            PlayerKeys.Player_Aseprite_Walk_Image,
            PlayerKeys.Player_Aseprite_Walk_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Attack3,
            PlayerKeys.Player_Aseprite_Attack3_Image,
            PlayerKeys.Player_Aseprite_Attack3_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Punch_Cross,
            PlayerKeys.Player_Aseprite_Punch_Cross_Image,
            PlayerKeys.Player_Aseprite_Punch_Cross_JSON,
        );

        this.load.aseprite(
            PlayerKeys.Player_Aseprite_Punch_Jab,
            PlayerKeys.Player_Aseprite_Punch_Jab_Image,
            PlayerKeys.Player_Aseprite_Punch_Jab_JSON,
        );

        this.load.json(
            PlayerKeys.Player_JSON_Name,
            PlayerKeys.Player_JSON_Path,
        );
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start(SceneKeys.Game);
    }
}


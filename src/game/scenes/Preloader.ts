import SceneKeys from "../const/SceneKeys";
import TextureKeys from "../const/TextureKeys";
import AssetPathKeys from "../const/AssetPathKeys";
import PlayerKeys from "../const/PlayerKeys";

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

    // **  [LOAD TILES]
    this.load.image(
      TextureKeys.Texture_BasicTileMap,
      AssetPathKeys.Texture_BasicTileMap,
    );
    this.load.image(
      TextureKeys.Texture_BasicTileMapTwo,
      AssetPathKeys.Texture_BasicTileMapTwo,
    );
    this.load.image(
      TextureKeys.Texture_Background,
      AssetPathKeys.Texture_Background,
    );

    this.load.image(
      TextureKeys.Texture_Background_Sky_One,
      AssetPathKeys.Texture_Background_Sky_One,
    );

    this.load.image(
      TextureKeys.Texture_Background_Sky_Two,
      AssetPathKeys.Texture_Background_Sky_Two,
    );

    // **  [LOAD LEVELS]
    this.load.image(TextureKeys.Level_0, AssetPathKeys.Level_0);

    this.load.tilemapTiledJSON(
      TextureKeys.Level_0_JSON,
      AssetPathKeys.Level_0_JSON,
    );

    // **  [LOAD PARTICLES]

    // **  [LOAD TEXTURES]
    // this.load.aseprite(
    //   TextureKeys.Player,
    //   AssetPathKeys.Player,
    //   AssetPathKeys.PlayerAseprite,
    // );

    this.load.aseprite(
      PlayerKeys.Anim_Run,
      `${PlayerKeys.Asset_Player_Anim_Run}.png`,
      `${PlayerKeys.Asset_Player_Anim_Run}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Attack1,
      `${PlayerKeys.Asset_Player_Anim_Attack1}.png`,
      `${PlayerKeys.Asset_Player_Anim_Attack1}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Attack2,
      `${PlayerKeys.Asset_Player_Anim_Attack2}.png`,
      `${PlayerKeys.Asset_Player_Anim_Attack2}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Idle,
      `${PlayerKeys.Asset_Player_Anim_Idle}.png`,
      `${PlayerKeys.Asset_Player_Anim_Idle}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Jump,
      `${PlayerKeys.Asset_Player_Anim_Jump}.png`,
      `${PlayerKeys.Asset_Player_Anim_Jump}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Land,
      `${PlayerKeys.Asset_Player_Anim_Land}.png`,
      `${PlayerKeys.Asset_Player_Anim_Land}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Walk,
      `${PlayerKeys.Asset_Player_Anim_Walk}.png`,
      `${PlayerKeys.Asset_Player_Anim_Walk}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Attack3,
      `${PlayerKeys.Asset_Player_Anim_Attack3}.png`,
      `${PlayerKeys.Asset_Player_Anim_Attack3}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Punch_Cross,
      `${PlayerKeys.Asset_Player_Anim_Punch_Cross}.png`,
      `${PlayerKeys.Asset_Player_Anim_Punch_Cross}.json`,
    );

    this.load.aseprite(
      PlayerKeys.Anim_Punch_Jab,
      `${PlayerKeys.Asset_Player_Anim_Punch_Jab}.png`,
      `${PlayerKeys.Asset_Player_Anim_Punch_Jab}.json`,
    );

    // **  [JSON]
    this.load.json(TextureKeys.PlayerJSON, PlayerKeys.Asset_PlayerJSON);
    this.load.json(TextureKeys.Level_0_Config, AssetPathKeys.Level_0_Config);
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start(SceneKeys.MainMenu);
  }
}

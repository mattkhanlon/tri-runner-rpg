import GlobalKeys from "./GlobalKeys";

/**
 * A path to each asset that is loaded into the game.
 */
enum AssetPathKeys {
  // ** [PLAYER OBJECTS]

  // ** [LEVEL OBJECTS]
  Level_0 = GlobalKeys.LevelFolder + "level_0/level_0.png",
  Level_0_JSON = GlobalKeys.LevelFolder + "level_0/level_0.json",
  Level_0_Config = GlobalKeys.LevelFolder + "level_0/level_0_config.json",

  // ** [TERRAIN]
  Texture_BasicTileMap = "terrain/basic_tilemap/basic_tilemap.png",
  Texture_BasicTileMapTwo = "terrain/basic_tilemap/basic_tileset_2.png",
  Texture_Background = "terrain/basic_tilemap/background.png",
  Texture_Background_Sky_One = "terrain/basic_tilemap/Background_1.png",
  Texture_Background_Sky_Two = "terrain/basic_tilemap/Background_2.png",
}

export default AssetPathKeys;

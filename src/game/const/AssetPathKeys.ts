import GlobalKeys from "./GlobalKeys";

/**
 * A path to each asset that is loaded into the game.
 */
enum AssetPathKeys {
  // ** [PLAYER OBJECTS]
  Player = GlobalKeys.SpriteFolder + "Player/default.player.png",
  PlayerAseprite = GlobalKeys.SpriteFolder + "Player/default.player.json",
  PlayerJSON = GlobalKeys.SpriteFolder + "Player/player.json",

  // ** [LEVEL OBJECTS]
  Level_0 = GlobalKeys.LevelFolder + "level_0/level_0.png",
  Level_0_JSON = GlobalKeys.LevelFolder + "level_0/level_0.json",
  Level_0_Config = GlobalKeys.LevelFolder + "level_0/level_0_config.json",

  // ** [TERRAIN]
  Terrain_Water = GlobalKeys.TerrainFolder + "terrain_water/terrain_water.png",
}

export default AssetPathKeys;

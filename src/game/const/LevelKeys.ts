export enum LevelKeys {
    // ** [LEVELS]
    Level_0_Name = "level_0",
    Level_0_Config = "level_0_config",
    Level_0_JSON_Name = "level_0_json",
    Level_0_Image_Name = "level_0_image",
    Level_0_Config_Path = "levels/level_0/level_0_config.json",
    Level_0_JSON_Path = "levels/level_0/level_0.json",
    Level_0_Image_Path = "levels/level_0/level_0.png",

    // ** [LEVEL LAYERS]
    Level_Background_Layer = "Background",
    Level_Player_Layer = "Level",
    Level_Portals_Layer = "Portals",
    Level_Enemy_Layer = "Enemies",
    Level_Respawn_Layer = "Portal_Respawns",

    // ** [LEVEL SPECIFIC]
    Level_Spawn_Locations = "Spawn_Locations",
    Level_Player_Spawn = "player_spawn",

    // ** [COLLISION GROUPS]
    Level_Layer_Collision_Group = 1,
    Level_Portal_Collision_Group = 77,
}

export default LevelKeys;

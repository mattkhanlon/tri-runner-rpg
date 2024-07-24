import GlobalKeys from "./GlobalKeys";

export enum PlayerKeys {
  Asset_Player = GlobalKeys.SpriteFolder + "Player/default.player.png",
  Asset_PlayerAseprite = GlobalKeys.SpriteFolder + "Player/default.player.json",
  Asset_PlayerJSON = GlobalKeys.SpriteFolder + "Player/player.json",
  Asset_Player_Anim_Run = GlobalKeys.SpriteFolder + "Player/Run/Run",
  Asset_Player_Anim_Attack1 = GlobalKeys.SpriteFolder +
    "Player/Attack1/Attack1",
  Asset_Player_Anim_Attack2 = GlobalKeys.SpriteFolder +
    "Player/Attack2/Attack2",
  Asset_Player_Anim_Idle = GlobalKeys.SpriteFolder + "Player/Idle/Idle",
  Asset_Player_Anim_Jump = GlobalKeys.SpriteFolder + "Player/Jump/Jump",
  Asset_Player_Anim_Land = GlobalKeys.SpriteFolder + "Player/Land/Land",
  Run = "Run",
  Idle = "Idle",
  Jump = "Jump",
  Fall = "Jump Down",
  Jump_Up = "Jump up",
  Hit = "Hit",
  Death = "Die",
  AttackBasic = "Attack1",
  AttackBasicCombo = "Attack2",
  Land = "Land",
}

export default PlayerKeys;

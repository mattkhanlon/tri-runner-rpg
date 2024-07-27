import GlobalKeys from "./GlobalKeys";

export enum PlayerKeys {
  // ** [ASSETS]
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
  Asset_Player_Anim_Walk = GlobalKeys.SpriteFolder + "Player/Walk/Walk",
  Asset_Player_Anim_Attack3 = GlobalKeys.SpriteFolder +
    "Player/Attack3/Attack3",
  Asset_Player_Anim_Punch_Jab = GlobalKeys.SpriteFolder +
    "Player/Punch_Jab/Punch_Jab",
  Asset_Player_Anim_Punch_Cross = GlobalKeys.SpriteFolder +
    "Player/Punch_Cross/Punch_Cross",

  // ** [ANIMATIONS]
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
  Walk = "Walk",
  Attack_Katana = "Attack3",
  Punch_Jab = "Punch_Jab",
  Punch_Cross = "Punch_Cross",

  // ** [ANIMATION KEYS]
  Anim_Run = "Player_Anim_Run",
  Anim_Attack1 = "Player_Anim_Attack1",
  Anim_Attack2 = "Player_Anim_Attack2",
  Anim_Idle = "Player_Anim_Idle",
  Anim_Jump = "Player_Anim_Jump",
  Anim_Land = "Player_Anim_Land",
  Anim_Walk = "Player_Anim_Walk",
  Anim_Attack3 = "Player_Anim_Attack3",
  Anim_Punch_Jab = "Player_Anim_Punch_Jab",
  Anim_Punch_Cross = "Player_Anim_Punch_Cross",
}

export default PlayerKeys;

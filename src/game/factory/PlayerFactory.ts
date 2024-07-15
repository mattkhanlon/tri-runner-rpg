import { Player } from "../classes/Player";

export default class PlayerFactory {
  /**
   *
   */
  static createPlayer(scene: Phaser.Scene, playerConfig: JSON) {
    const player = new Player(scene, playerConfig);
    return player;
  }
}

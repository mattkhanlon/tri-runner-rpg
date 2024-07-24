import LevelConfig from "../config/LevelConfig";
import { Player } from "./Player";
import { World } from "./World";

export class Level extends World {
  constructor(scene: Phaser.Scene, config: LevelConfig) {
    super(scene, config);
  }

  create() {
    // ** Load the texture
    this.loadTextures(this.map.tilesets);

    // ** Create the layers
    this.createMapLayers(this.map.layers);

    // ** Create the Objects
    this.createMapObjects(this.map.objects);

    // ** Object specfic
    this.createMapSpawnPoint();
  }

  update(player: Player) {
    //this.checkCollisionWith(player);
  }
}

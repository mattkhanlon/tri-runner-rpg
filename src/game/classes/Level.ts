import LevelConfig from "../config/LevelConfig";
import { LevelLayerKeys } from "../const/LevelKeys";
import { Player } from "./Player";
import { World } from "./World";

export class Level extends World {
  constructor(scene: Phaser.Scene, config: LevelConfig) {
    super(scene, config);
  }

  create() {
    // ** Create the layers
    this.createMapLayers(this.config.Layers.Border);
    this.createMapLayers(this.config.Layers.World);

    this.createBaseLayer();

    // ** Create the Objects
    this.createMapObjects(this.config.Objects.Interactive);

    // ** Object specfic
    this.createMapSpawnPoint();

    // ** Create the collision layer
    this.createCollisionLayer();
  }

  finalizeLevelCreation() {
    // **  Create the top layer
    this.createMapLayers(this.config.Layers.Environment);
  }

  update(player: Player) {
    this.checkCollisionWith(player);
  }
}

import { LevelObjectKeys } from "../const/LevelKeys";
import LevelConfig from "../config/LevelConfig";
import { Player } from "./Player";

export class World {
  // ** []
  baseLayer: Phaser.Tilemaps.TilemapLayer | null;

  // ** []
  collisionLayer: Phaser.Tilemaps.TilemapLayer | null;

  // ** []
  collisionLayers: Array<Phaser.Tilemaps.TilemapLayer | null> = [];

  // ** [Store the current loaded Config]
  config: LevelConfig;

  gravity: number = 1;

  // ** [Store the current loaded Key]
  key: string;

  // ** [The map for the created World/Level]
  map: Phaser.Tilemaps.Tilemap;

  // ** [The Tileset list for the map]
  mapTileset: string[] = [];

  maxHeight: number = 5000;

  maxWidth: number = 5000;

  scene: Phaser.Scene;

  // ** [Player spawn points]
  spawnPoint: { x: number; y: number };

  constructor(scene: Phaser.Scene, config: LevelConfig) {
    // ** Save the Config
    this.scene = scene;
    this.config = config;
    this.key = config.map;
    this.map = scene.make.tilemap({
      key: this.key,
    });
  }

  /**
   * Check if there is a collision with
   * the player object.
   *
   * @param player Accepts the player object
   */
  checkCollisionWith(player: Player) {
    this.scene.matter.collision.collides(
      player.body,
      this.collisionLayers,
      true,
    );
  }

  /**
   * Creates the layers from a string array
   *
   * @param layers Array of layer names
   */
  createMapLayers(layers: Phaser.Tilemaps.LayerData[]) {
    for (let i = 0; i < layers.length; i++) {
      const layer = this.map.createLayer(layers[i].name, this.mapTileset);
      this.createLayerBoundries(layer);
    }
  }

  /**
   * Create boundries from the
   * @wall_boundries Object layer
   */
  createLayerBoundries(layer: Phaser.Tilemaps.TilemapLayer | null) {
    this.map.setCollisionByProperty({
      collides: true,
      layer: layer,
    });
    this.scene.matter.world.convertTilemapLayer(layer);
    this.collisionLayers?.push(layer);
  }

  /**
   * Creates the layers from a string array
   *
   * @param objects Array of layer names
   */
  createMapObjects(objects: Phaser.Tilemaps.ObjectLayer[]) {
    console.log(this.map);
    for (let i = 0; i < objects.length; i++) {
      this.map.createFromObjects(objects[i].name, objects[i]);
    }
  }

  /**
   * Loads the tileset for the given level
   *
   * @param tileset tileset we need to load
   */
  createMapTileset(tileset: string) {
    // ** [CREATE THE TILESET FROM THE IMAGES WE'VE LOADED]

    this.map.addTilesetImage(tileset, tileset);
    this.mapTileset.push(tileset);
  }

  /**
   * Capture the spawn point for the loaded map
   */
  createMapSpawnPoint() {
    let spawnIndex: number = -1;

    // ** Get the Spawn point
    const object = this.map.getObjectLayer(
      LevelObjectKeys.Level_Spawn_Locations,
    );

    // ** Make sure we found the object
    if (object != null) {
      spawnIndex = object?.objects.findIndex((o) => {
        return o.name === LevelObjectKeys.Level_Player_Spawn;
      });
    }

    this.spawnPoint = {
      x: object?.objects[spawnIndex].x,
      y: object?.objects[spawnIndex].y,
    };
  }

  /**
   * List the textures you need to create a tileset fro
   */
  loadTextures(tilesets: Phaser.Tilemaps.Tileset[]) {
    // ** [Load Tilesets]
    for (let i = 0; i < tilesets.length; i++) {
      this.createMapTileset(tilesets[i].name);
    }
  }
}

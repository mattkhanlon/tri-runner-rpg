import { LevelLayerKeys, LevelObjectKeys } from "../const/LevelKeys";
import LevelConfig from "../config/LevelConfig";
//import TextureKeys from "../const/TextureKeys";
import { Player } from "./Player";

export class World extends Phaser.GameObjects.GameObjectCreator {
  // ** []
  baseLayer: Phaser.Tilemaps.TilemapLayer | null;

  // ** []
  collisionLayer: Phaser.Tilemaps.TilemapLayer | null;

  // ** []
  collisionLayers: Array<Phaser.Tilemaps.TilemapLayer | null> = [];

  // ** [Store the current loaded Config]
  config: LevelConfig;

  // ** [Store the current loaded Key]
  key: string;

  // ** [The map for the created World/Level]
  map: Phaser.Tilemaps.Tilemap;

  // ** [The Tileset list for the map]
  mapTileset: string[] = [];

  // ** [Player spawn points]
  spawnPoint: { x: number; y: number };

  constructor(scene: Phaser.Scene, config: LevelConfig) {
    super(scene);

    // ** Save the Config
    this.config = config;
    this.key = config.map;

    this.map = scene.make.tilemap({
      key: this.key,
    });
    this.loadTextures();
  }

  /**
   * Check if there is a collision with
   * the player object.
   *
   * @param player Accepts the player object
   */
  checkCollisionWith(player: Player) {
    console.log("Checking collision");
    this.scene.physics.collide(player, this.collisionLayers);
  }

  /**
   * Creates the layers from a string array
   *
   * @param layers Array of layer names
   */
  createMapLayers(layers: string[]) {
    for (let i = 0; i < layers.length; i++) {
      const layer = this.map.createLayer(layers[i], this.mapTileset);
      this.createLayerBoundries(layer);
    }
  }

  /**
   * Create the base layer.
   *
   * This is where the Player is added.
   * The layer above this is the Collision layer
   */
  createBaseLayer() {
    this.baseLayer = this.map.createLayer(
      LevelLayerKeys.Level_Base_Floor,
      this.mapTileset,
    );

    this.createLayerBoundries(this.baseLayer);
  }

  /**
   * This creates and hides the collision
   * layer.
   */
  createCollisionLayer() {
    this.collisionLayer = this.map.createLayer(
      LevelLayerKeys.Level_Collision_Floor,
      this.mapTileset,
    );

    this.collisionLayer?.setAlpha(0);
    this.createLayerBoundries(this.collisionLayer);
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
    console.log(layer);
    console.log(this.collisionLayers);
    this.collisionLayers?.push(layer);
  }

  /**
   * Creates the layers from a string array
   *
   * @param objects Array of layer names
   */
  createMapObjects(objects: { key: string; name: string }[]) {
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

  // ** [LOAD]
  loadTextures() {
    // ** [Load Tilesets]
  }
}

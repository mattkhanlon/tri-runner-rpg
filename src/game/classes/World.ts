import { LevelKeys } from "../const/LevelKeys";
import LevelInterface from "../interfaces/LevelInterface";

export class World {
    // ** Store the current loaded Config
    levelConfig: LevelInterface;

    // ** Store the current loaded Key
    key: string;

    // ** The map for the created World/Level
    map: Phaser.Tilemaps.Tilemap;

    // ** The Tileset list for the map
    mapTileset: string[] = [];

    // ** Max width of the map
    maxHeight: number = 5000;

    // ** Max height of the map
    maxWidth: number = 5000;

    // ** Our phaser scene
    scene: Phaser.Scene;

    // ** Player spawn points
    spawnPoint: { x: number; y: number };

    constructor(scene: Phaser.Scene, config: LevelInterface) {
        // ** Save the Config
        this.scene = scene;
        this.levelConfig = config;
        this.key = config.map;
        this.map = scene.make.tilemap({
            key: this.key,
        });

        //this.maxWidth = this.map.widthInPixels;
        //this.maxHeight = this.map.heightInPixels;
    }

    /**
     * Check if there is a collision with
     * the player object.
     *
     * @param player Accepts the player object
     */
    checkCollisionWith() {}

    /**
     * Creates the layers from a string array
     *
     * @param layers Array of layer names
     */
    createMapLayers(layers: Phaser.Tilemaps.LayerData[]) {
        for (let i = 0; i < layers.length; i++) {
            const layer = this.map.createLayer(layers[i].name, this.mapTileset);

            console.log(layer);
            switch (layer?.layer.name) {
                case LevelKeys.Level_Player_Layer:
                    this.createLayerBoundries(layer);
                    break;
            }
            this.scene.matter.world.convertTilemapLayer(layer!);
        }
    }

    /**
     * Create boundries from the
     * @wall_boundries Object layer
     */
    createLayerBoundries(layer: Phaser.Tilemaps.TilemapLayer | null) {
        this.map.setCollisionByProperty({
            collides: true,
            recalculateFaces: true,
            layer: layer,
        });
    }

    /**
     * Creates the layers from a string array
     *
     * @param objects Array of layer names
     */
    createMapObjects(objects: Phaser.Tilemaps.ObjectLayer[]) {
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
        const object = this.map.getObjectLayer(LevelKeys.Level_Spawn_Locations);

        // ** Make sure we found the object
        if (object != null) {
            spawnIndex = object?.objects.findIndex((o) => {
                return o.name === LevelKeys.Level_Player_Spawn;
            });
        }

        this.spawnPoint = {
            x: object?.objects[spawnIndex].x!,
            y: object?.objects[spawnIndex].y!,
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

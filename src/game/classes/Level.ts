import { World } from "./World";
import LevelInterface from "../interfaces/LevelInterface";
import { Player } from "./Player";

export class Level extends World {
    constructor(scene: Phaser.Scene, levelConfig: LevelInterface) {
        super(scene, levelConfig);
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

    update() {}

    placePlayer(player: Player) {
        player.x = this.spawnPoint.x;
        player.y = this.spawnPoint.y - 10;
    }
}


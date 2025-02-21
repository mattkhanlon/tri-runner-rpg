import { World } from "./World";
import { LevelKeys } from "../const/LevelKeys";
import LevelInterface from "../interfaces/LevelInterface";
import { Player } from "./Player";
import TextureKeys from "../const/TextureKeys";
import PlayerKeys from "../const/PlayerKeys";

export class Level extends World {
    protected player: Player;

    constructor(scene: Phaser.Scene, levelConfig: LevelInterface) {
        super(scene, levelConfig);

        this.levelConfig = levelConfig;
    }

    /**
     * Create the level
     */
    create() {
        // ** Load the texture
        this.loadTextures(this.map.tilesets);

        // ** Create the layers
        this.createMapLayers(this.map.layers);

        // ** Create the Objects
        this.createMapObjects(this.map.objects);

        // ** Set up Level teleporters
        this.setupPortals();

        // ** Object specfic
        this.createMapSpawnPoint();
    }

    update() {}

    /**
     * Place the player at the designated spawn point
     * @param player Represents our player object
     */
    placePlayer(player: Player) {
        this.player = player;
        this.player.x = this.spawnPoint.x;
        this.player.y = this.spawnPoint.y - 10;
    }

    private setupPortals(): void {
        const portalLayer = this.map.getObjectLayer(
            LevelKeys.Level_Portals_Layer,
        );

        portalLayer?.objects.forEach((object) => {
            const portal = this.scene.matter.add.image(
                object.x!,
                object.y!,
                TextureKeys.tx_level_portal_name,
            );
            portal.setScale(0.3);
            portal.setIgnoreGravity(true);
            portal.x = object.x! + 15;
            portal.setCollisionGroup(LevelKeys.Level_Portal_Collision_Group);
            portal.setOnCollide((event) => {
                const bodyAGroup = event.bodyA.collisionFilter.group;
                const bodyBGroup = event.bodyB.collisionFilter.group;

                if (
                    (bodyAGroup === PlayerKeys.Player_Collision_Group &&
                        bodyBGroup ===
                            LevelKeys.Level_Portal_Collision_Group) ||
                    (bodyBGroup === PlayerKeys.Player_Collision_Group &&
                        bodyAGroup === LevelKeys.Level_Portal_Collision_Group)
                ) {
                    this.teleportPlayer(this.player, object.name!);
                }
            });
        });
    }

    teleportPlayer(player: Player, portalName: string): void {
        const portalRespawnPoints = this.map.getObjectLayer(
            LevelKeys.Level_Respawn_Layer,
        );

        const portalPoint = portalRespawnPoints.objects.find((obj) => {
            return obj.name === `${portalName}_respawn`;
        });

        this.player.x = portalPoint?.x!;
        this.player.y = portalPoint?.y! - 5;
    }
}


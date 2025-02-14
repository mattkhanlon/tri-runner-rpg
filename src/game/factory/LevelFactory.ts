import { Level } from "../classes/Level";
import LevelInterface from "../interfaces/LevelInterface";

export default class LevelFactory {
    /**
     * Create a player object based off the Config File provided
     *
     * @param scene The scene to add the player to
     * @param playerConfig The playerConfig to create the player using
     */
    static createLevel(scene: Phaser.Scene, levelConfig: LevelInterface) {
        const level = new Level(scene, levelConfig);
        return level;
    }

    /**
     * Save the player config as JSON
     *
     * @param Level The player object
     */
    static saveLevel(level: Level) {
        console.log(level);
    }
}

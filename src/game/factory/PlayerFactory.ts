import { Player } from "../classes/Player";
import PlayerInterface from "../interfaces/PlayerInterface";

export default class PlayerFactory {
    /**
     * Create a player object based off the Config File provided
     *
     * @param scene The scene to add the player to
     * @param playerConfig The playerConfig to create the player using
     */
    static createPlayer(scene: Phaser.Scene, playerConfig: PlayerInterface) {
        const player = new Player(scene, playerConfig);
        return player;
    }

    /**
     * Save the player config as JSON
     *
     * @param player The player object
     */
    static savePlayer(player: Player) {
        console.log(player);
    }
}

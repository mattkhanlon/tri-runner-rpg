/**
 * Define the JSON Config
 */
interface PlayerConfig {
  player: {
    health: number;
    equipment: Array<string>;
  };
}

export default PlayerConfig;

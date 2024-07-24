/**
 * Defines how the LevelConfig should
 * be structured
 */
interface LevelConfig {
  name: string;
  map: string;
  gravity: number;
  Layers: string[];
  Tileset: string[];
  Objects: {
    Interactive: { key: string; name: string }[];
  };
}
export default LevelConfig;

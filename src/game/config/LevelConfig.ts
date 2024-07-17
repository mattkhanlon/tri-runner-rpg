/**
 * Defines how the LevelConfig should
 * be structured
 */
interface LevelConfig {
  name: string;
  map: string;
  Layers: {
    Border: string[];
    World: string[];
    Base: string[];
    Collision: string[];
    Interactive: string[];
    Environment: string[];
  };
  Objects: {
    Interactive: { key: string; name: string }[];
  };
}
export default LevelConfig;

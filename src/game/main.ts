import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1600,
  height: 900,
  parent: "game-container",
  backgroundColor: "#595959",
  input: {
    gamepad: true,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: { x: 0, y: 0.2 },
      positionIterations: 10,
      velocityIterations: 10,
      "plugins.attractors": true,
      "plugins.wrap": true,
      runner: {
        fps: 60,
      },
    },
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
  fps: {
    min: 30,
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;

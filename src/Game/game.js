import GameCtrl from "./controllers/gameCtrl";
import boardModel from "./models/board";
import boardView from "./views/boardView";

// w tym pliku będziemy inicjalizować aplikację
export default class Game {
  constructor(boardContainerId, promotionContainerId) {
    this._gameCtrl = new GameCtrl(
      boardView,
      boardModel,
      boardContainerId,
      promotionContainerId
    );
  }

  init() {
    this._gameCtrl.init();
  }
}

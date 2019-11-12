export default class GameCtrl {
  constructor(BoardView, BoardModel, boardContainerId) {
    this._boardContainer = document.querySelector(`#${boardContainerId}`);
    this._boardModel = new BoardModel();
    this._boardView = new BoardView(this._boardContainer);
  }

  _setListeners() {
    this._boardContainer.addEventListener("click", ev => {
      const squarePosition = ev.target
        .closest(".square")
        .dataset.id.split("-")
        .map(el => {
          return +el;
        });
      this._controllClick(squarePosition);
    });
  }

  _controllClick(position) {
    const x = position[0];
    const y = position[1];

    const boardElement = this._boardModel[x][y] || null;

    boardElement ? this._getMoves(boardElement) : null;

    const gotBoardElement = Boolean(boardElement);
    const gotMarkedFigure = Boolean(this._markedFigure);

    this._handleMark(boardElement);
  }

  _getMoves(figure) {
    const moves = figure.findLegalMoves(this._boardModel);
    console.log(moves);
    return moves;
  }

  _displayMoves(figure) {
    let moves = this._getMoves(figure);

    this._boardView.highlightSquares(moves);
  }

  _handleMark(figure) {
    this._markedFigure = figure;
    this._displayMoves(figure);
  }

  init() {
    console.log("Inicjalizacja controllera...");

    this._boardModel.init();
    this._boardView.init(this._boardModel);
    this._setListeners();

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}

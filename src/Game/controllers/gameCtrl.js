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

        if(ev.target.closest(".square").classList.contains('highlighted')){
          this._boardView.removeAllHighlights();
          this.doMove(squarePosition);
        } else {
          this._controllClick(squarePosition);
        }
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
    if(figure){
      const moves = figure.findLegalMoves(this._boardModel);
      console.log(moves);
      return moves;
    }
  }

  _displayMoves(figure) {
    let moves = this._getMoves(figure);

    this._boardView.highlightSquares(moves);
  }

  _handleMark(figure) {
    this._markedFigure = figure;

    this._boardView.removeAllHighlights();
    this._displayMoves(figure);
  }

  doMove(squarePos){
    const x = squarePos[0];  //pozycja x klikniecia
    const y = squarePos[1];  //pozycja y klikniecia
    const figX = this._markedFigure._x;  //pozycja x figury
    const figY = this._markedFigure._y;  //pozycja y figury

    this._markedFigure._x = x;
    this._markedFigure._y = y;
    this._markedFigure._pristine = false;
    
    this._boardModel[figX][figY]="";//`${figX}, ${figY}`;
    this._boardModel[x][y]=this._markedFigure;
    this._boardView._displayPieces(this._boardModel);
  }

  init() {
    console.log("Inicjalizacja controllera...");

    this._boardModel.init();
    this._boardView.init(this._boardModel);
    this._setListeners();

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}

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
    return moves;
  }
  //funkcja do filtorwania ruchów króla tak żeby nie mógł wejść na pola, na których będzie mógł być zbity przez przeciwnika
  _filteredMoves(figure) {
    let moves = figure.findLegalMoves(this._boardModel);
    //dzialania typowo dla króla
    if (figure.name === 'King') {
      const moveBoard = {
        white_in_danger: [],
        black_in_danger: [],
        pionki: [],
      }
      for (let i = 0; i < this._boardModel.length; i++) {
        for (let j = 0; j < this._boardModel[i].length; j++) {
          if (this._boardModel[i][j] !== undefined && this._getMoves(this._boardModel[i][j]) !== undefined) {
            moveBoard.pionki.push(this._boardModel[i][j].name)
            let moves_tab = this._getMoves(this._boardModel[i][j]);
            let tabToPush = moveBoard.black_in_danger;
            if (this._boardModel[i][j]._side === 'black') {
              tabToPush = moveBoard.white_in_danger;
            }
            moves_tab.forEach(mov => {
              if (!Array.isArray(tabToPush[mov[0]])) { tabToPush[mov[0]] = [] }
              tabToPush[mov[0]][mov[1]] = 'danger'
            });
          }
        }
      }
      // filtrowanie ruchów Króla
      let side;
      figure._side === 'white' ? side = moveBoard.white_in_danger : side = moveBoard.black_in_danger;
      let res;
      moves = moves.filter((mov) => { side[mov[0]] && side[mov[0]][mov[1]] ? res = side[mov[0]][mov[1]] !== 'danger' : res = true; return res });
    }
    // koniec i zwracanie albo przefiltorwanej tablicy, albo normalnej
    return moves;
  }

  _displayMoves(figure) {
    // let moves = this._getMoves(figure);
    //podpiałem nowa dablice do wyświetlania ruchów oraz zmieniłem pozycje jednego z króli dla sprawdzenia pozycji
    let moves = this._filteredMoves(figure);
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

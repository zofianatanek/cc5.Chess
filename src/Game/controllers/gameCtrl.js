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
    console.log(boardElement);

    boardElement ? this._getMoves(boardElement) : null;

    const gotBoardElement = Boolean(boardElement);
    const gotMarkedFigure = Boolean(this._markedFigure);

    this._handleMark(boardElement);
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

  _handleMark(figure) {
    this._markedFigure = figure;
    this._boardView.removeAllHighlights();    
    this._displayMoves(figure);
  }

  _displayMoves(figure) {
    // let moves = this._getMoves(figure);
    //podpiałem nowa dablice do wyświetlania ruchów oraz zmieniłem pozycje jednego z króli dla sprawdzenia pozycji
    let moves = this.filterAllyBeating(this._filteredMoves(figure), figure._side);
    this._boardView.highlightSquares(moves);
  }

  _getMoves(figure) {
    if(figure){
      const moves = figure.findLegalMoves(this._boardModel);
      console.log(moves);
      return moves;
    }
  }

  filterAllyBeating(possibleMoves, side) {
    return possibleMoves.filter(element => {
      let moveX =  element[0];
      let moveY = element[1];
      if (this._boardModel[moveX][moveY]){     //jesli jest figura
        return (this._boardModel[moveX][moveY]._side!==side); // innego koloru? true; tego samego? false 
      }
      return true;      
    });
  }

  doMove(squarePos){
    const x = squarePos[0];  //pozycja x klikniecia
    const y = squarePos[1];  //pozycja y klikniecia
    const figX = this._markedFigure._x;  //pozycja x figury
    const figY = this._markedFigure._y;  //pozycja y figury

    this._markedFigure._x = x;
    this._markedFigure._y = y;
    this._markedFigure._pristine = false;
    
    this._boardModel[figX][figY]=null;
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

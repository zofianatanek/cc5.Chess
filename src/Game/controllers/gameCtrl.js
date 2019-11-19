export default class GameCtrl {
  constructor(BoardView, BoardModel, boardContainerId) {
    this._boardContainer = document.querySelector(`#${boardContainerId}`);
    this._boardModel = new BoardModel();
    this._boardView = new BoardView(this._boardContainer);
    this.turn = 'white';
    this.movePossibility = true;
  }

  _setListeners() {
    this._boardContainer.addEventListener("click", ev => {
      const squarePosition = ev.target
        .closest(".square")
        .dataset.id.split("-")
        .map(el => {
          return +el;
        });

      if (ev.target.closest(".square").classList.contains('highlighted')) {
        //castling
        if (ev.target.closest(".square").dataset.castlingX && ev.target.closest(".square").dataset.castlingY) {
          this.doCastling([parseInt(ev.target.closest(".square").dataset.castlingX), parseInt(ev.target.closest(".square").dataset.castlingY)], [squarePosition]);
          this.doMove(squarePosition);
        } else {
          //nocastling
          if(this.movePossibility){
            this.doMove(squarePosition);
          }
        }
        this._boardView.removeAllHighlights();

      } else {
        this._controllClick(squarePosition);
      }
    });
  }

  _controllClick(position) {
    const x = position[0];
    const y = position[1];
    const flag = this.turn;
    

    const boardElement = this._boardModel[x][y] || null;
    console.log(boardElement);
    const elementSide = boardElement._side

    boardElement ? this._getMoves(boardElement) : null;

    const gotBoardElement = Boolean(boardElement);
    const gotMarkedFigure = Boolean(this._markedFigure);

    flag === elementSide ? this.movePossibility = true : this.movePossibility = false;

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
      }
      for (let i = 0; i < this._boardModel.length; i++) {
        for (let j = 0; j < this._boardModel[i].length; j++) {
          if (this._boardModel[i][j] !== undefined && this._getMoves(this._boardModel[i][j]) !== undefined) {
            if (this._boardModel[i][j].name !== 'pawn') {
              moveBoard.pionki.push(this._boardModel[i][j].name)
              var moves_tab = this._getMoves(this._boardModel[i][j]);
            } else {
              var moves_tab = [];
              // var moves_tab = this._boardModel[i][j].findLegalAttacks.call(this._boardModel[i][j], this._boardModel);
              // sprawdzenie czy króla może zbic pionek !
              var that = this._boardModel[i][j];
              // var moves_tab;
              moves_tab.push([
                [that._x + that._vector],
                [that._y + 1]
              ], [
                [that._x + that._vector],
                [that._y - 1]
              ]);
            }

            let tabToPush = moveBoard.black_in_danger;
            if (this._boardModel[i][j]._side === 'black') {
              tabToPush = moveBoard.white_in_danger;
            }
            moves_tab.forEach(mov => {
              if (!Array.isArray(tabToPush[mov[0]])) {
                tabToPush[mov[0]] = []
              }
              tabToPush[mov[0]][mov[1]] = 'danger'
            });
          }
        }
      }
      // filtrowanie ruchów Króla
      let side;
      figure._side === 'white' ? side = moveBoard.white_in_danger : side = moveBoard.black_in_danger;
      let res;
      moves = moves.filter((mov) => {
        side[mov[0]] && side[mov[0]][mov[1]] ? res = side[mov[0]][mov[1]] !== 'danger' : res = true;
        return res
      });
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
    this.movePossibility == true ? this._boardView.highlightSquares(moves) : this._boardView.removeAllHighlights();
  }

  _getMoves(figure) {
    if (figure) {
      const moves = figure.findLegalMoves(this._boardModel);
      // console.log(moves);
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

    this._boardModel[figX][figY] = null; //`${figX}, ${figY}`;
    this._boardModel[x][y] = this._markedFigure;
 
    
    this._boardView._displayPieces(this._boardModel);
    this.turn === 'white' ? this.turn = 'black' : this.turn = 'white'; //kolej białych czy czarnych
    
   
  }
  doCastling(cords, a) {
    let sign;
    cords[1] > 4 ? sign = -1 : sign = 1;

    let fig = this._boardModel[cords[0]][cords[1]];
    this._boardModel[fig._x][a[0][1] + sign] = fig;
    this._boardModel[fig._x][a[0][1] + sign]._y = a[0][1] + sign;
    this._boardModel[cords[0]][cords[1]] = null;
  }

  init() {
    console.log("Inicjalizacja controllera...");

    this._boardModel.init();
    this._boardView.init(this._boardModel);
    this._setListeners();
    

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}
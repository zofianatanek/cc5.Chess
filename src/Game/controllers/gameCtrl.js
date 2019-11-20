import Pawn from "../pieces/pawn";
import Knight from "../pieces/knight";
import Bishop from "../pieces/bishop";
import Rook from "../pieces/rook";
import Queen from "../pieces/queen";

export default class GameCtrl {
  constructor(BoardView, BoardModel, boardContainerId, promotionContainerId) {
    this._boardContainer = document.querySelector(`#${boardContainerId}`);
    this._promotionContainer = document.querySelector(
      `#${promotionContainerId}`
    );
    this._boardModel = new BoardModel();
    this._boardView = new BoardView(this._boardContainer);
    this.turn = "white";
    this.movePossibility = true;
    this.promoting = false;
    this.handleSelectPromoted = figureName => {
      this.finishPromotion(figureName);
    };
  }

  _setListeners() {
    this._boardContainer.addEventListener("click", ev => {
      const squarePosition = ev.target
        .closest(".square")
        .dataset.id.split("-")
        .map(el => {
          return +el;
        });

      if (ev.target.closest(".square").classList.contains("highlighted")) {
        //castling
        if (
          ev.target.closest(".square").dataset.castlingX &&
          ev.target.closest(".square").dataset.castlingY
        ) {
          this.doCastling(
            [
              parseInt(ev.target.closest(".square").dataset.castlingX),
              parseInt(ev.target.closest(".square").dataset.castlingY)
            ],
            [squarePosition]
          );
          this.doMove(squarePosition);
        } else {
          //nocastling
          if (this.movePossibility) {
            this.doMove(squarePosition);
            if (
              this._markedFigure.name === "pawn" &&
              ((this._markedFigure._x == 7 &&
                this._markedFigure._side == "black") ||
                (this._markedFigure._x == 0 &&
                  this._markedFigure._side == "white"))
            ) {
              this.initPromotion(this._markedFigure);
            }
          }
        }
        this._boardView.removeAllHighlights();
      } else {
        this._controllClick(squarePosition);
      }
    });
  }

  initPromotion(figure) {
    this._promotionContainer.hidden = false;
    const side = figure._side;
    this._promotionContainer.innerHTML = `
      <i data-color="${side}" class="fas fa-chess-knight ${side} promotion-figure" id="knight"'></i>
      <i data-color="${side}" class="fas fa-chess-bishop ${side} promotion-figure" id="bishop"'></i>
      <i data-color="${side}" class="fas fa-chess-rook ${side} promotion-figure" id="rook"'></i>
      <i data-color="${side}" class="fas fa-chess-queen ${side} promotion-figure" id="queen"'></i>`;
    this._promotionContainer.classList.add(`${side}`);

    const figures = document.querySelectorAll(".promotion-figure");
    figures.forEach(figure => {
      figure.addEventListener("click", () => {
        this.handleSelectPromoted(figure.id);
      });
    });
    this.promoting = true;
  }

  finishPromotion(figureName) {
    this._promotionContainer.hidden = true;
    const x = this._markedFigure._x;
    const y = this._markedFigure._y;
    let figure;
    switch (figureName) {
      case "knight":
        figure = new Knight(x, y, this._markedFigure._side);
        break;
      case "bishop":
        figure = new Bishop(x, y, this._markedFigure._side);
        break;
      case "rook":
        figure = new Rook(x, y, this._markedFigure._side);
        break;
      case "queen":
        figure = new Queen(x, y, this._markedFigure._side);
        break;
    }
    this._boardModel[x][y] = figure;
    this._boardView._displayPieces(this._boardModel);
    this.promoting = false;
  }

  _controllClick(position) {
    const x = position[0];
    const y = position[1];
    const flag = this.turn;

    const boardElement = this._boardModel[x][y] || null;
    console.log(boardElement);
    const elementSide = boardElement._side;

    boardElement ? this._getMoves(boardElement) : null;

    const gotBoardElement = Boolean(boardElement);
    const gotMarkedFigure = Boolean(this._markedFigure);

    flag === elementSide
      ? (this.movePossibility = true)
      : (this.movePossibility = false);

    this._handleMark(boardElement);
  }

  //funkcja do filtorwania ruchów króla tak żeby nie mógł wejść na pola, na których będzie mógł być zbity przez przeciwnika
  _filteredMoves(figure, check_mat = false) {
    let moves = figure.findLegalMoves(this._boardModel);
    //dzialania typowo dla króla
    if (figure.name === "King") {
      const moveBoard = {
        white_in_danger: [],
        black_in_danger: [],
        pionki: []
      };
      for (let i = 0; i < this._boardModel.length; i++) {
        for (let j = 0; j < this._boardModel[i].length; j++) {
          if (
            this._boardModel[i][j] !== undefined &&
            this._getMoves(this._boardModel[i][j]) !== undefined
          ) {
            if (this._boardModel[i][j].name === "King") {
              moveBoard.pionki.push(this._boardModel[i][j]);
            }

            if (this._boardModel[i][j].name !== "pawn") {
              var moves_tab = this._getMoves(this._boardModel[i][j]);
            } else {
              var moves_tab = [];
              // var moves_tab = this._boardModel[i][j].findLegalAttacks.call(this._boardModel[i][j], this._boardModel);
              // sprawdzenie czy króla może zbic pionek !
              var that = this._boardModel[i][j];
              // var moves_tab;
              moves_tab.push(
                [[that._x + that._vector], [that._y + 1]],
                [[that._x + that._vector], [that._y - 1]]
              );
            }

            let tabToPush = moveBoard.black_in_danger;
            if (this._boardModel[i][j]._side === "black") {
              tabToPush = moveBoard.white_in_danger;
            }
            moves_tab.forEach(mov => {
              if (!Array.isArray(tabToPush[mov[0]])) {
                tabToPush[mov[0]] = [];
              }
              tabToPush[mov[0]][mov[1]] = "danger";
            });
          }
        }
      }
      // filtrowanie ruchów Króla
      let side;
      let mat_pionki = [];
      figure._side === "white"
        ? (side = moveBoard.white_in_danger)
        : (side = moveBoard.black_in_danger);
      figure._side !== "white"
        ? mat_pionki.push(...moveBoard.white_in_danger)
        : mat_pionki.push(...moveBoard.black_in_danger);
      let res;
      moves = moves.filter(mov => {
        side[mov[0]] && side[mov[0]][mov[1]]
          ? (res = side[mov[0]][mov[1]] !== "danger")
          : (res = true);
        //przekazanie parametrow do spr mata
        return res;
      });
      //obsluga mata, tworzenie tablicy która bd przekazywana do _mat
      if (check_mat && figure.name === "King") {
        let King_cord = [figure._x, figure._y];

        //sprawdzenie czy król jest zagrożony na miejscu na którym obecnie stoi

        let mat = false;
        if (
          side[King_cord[0]] &&
          side[King_cord[0]][King_cord[1]] === "danger"
        ) {
          mat = true;
        }
        check_mat.push(...mat_pionki);
        return [moves, mat, check_mat];
      }
    }
    // koniec i zwracanie albo przefiltorwanej tablicy, albo normalnej
    return moves;
  }

  _mat() {
    //pobrać dwóch króli
    //sprawdzić czy mają dostępne ruchy
    //sprawdzić czy są bici w bierzącym momencie
    //sprawdzić czy mają inne figury
    var king_tab = [];
    let txt = "Szach i Mat - Koniec GRY";
    //szukamy królów na mapie
    this._boardModel.forEach(el => {
      el.forEach(fig => {
        if (fig !== undefined && fig !== null && fig.name === "King") {
          king_tab.push(fig);
        }
      });
    });
    if (king_tab.length >= 2) {
      var King1_arr = this._filteredMoves(king_tab[0], []);
      var King2_arr = this._filteredMoves(king_tab[1], []);
      var K1_moves = King1_arr[0];
      var K2_moves = King2_arr[0];
      var K1_matowany = King1_arr[1];
      var K2_matowany = King2_arr[1];
      var K1_pionki = King1_arr[2];
      var K2_pionki = King2_arr[2];
      if (K1_matowany || K2_matowany) {
        let king;
        K2_matowany ? (king = king_tab[1]) : (king = king_tab[0]);
        if (king._side !== this.turn) {
          alert(txt + ` ${king._side} side  przegrał 1`);
        }
      } else if (
        (K1_moves.length <= 0 && K1_pionki <= 0) ||
        (K2_moves <= 0 && K2_pionki <= 0)
      ) {
        let king;
        K1_moves.length <= 0 && K1_pionki <= 0
          ? (king = king_tab[0])
          : (king = king_tab[1]);
        alert(txt + ` ${king._side} side  przegrał 2`);
      } else {
        return;
      }
    } else {
      alert(txt);
    }
  }
  _handleMark(figure) {
    if (!this.promoting) {
      this._markedFigure = figure;
      this._boardView.removeAllHighlights();
      this._displayMoves(figure);
    }
  }

  _displayMoves(figure) {
    // let moves = this._getMoves(figure);
    //podpiałem nowa dablice do wyświetlania ruchów oraz zmieniłem pozycje jednego z króli dla sprawdzenia pozycji

    let moves = this._filteredMoves(figure);
    this._boardView.highlightSquares(moves);

    //podpięcie mata, moim zdaniem to nie tutaj powinno być wpięte, a raczej tam gdzie są tury, ale nie wiem gdzie one są więc wpinam je tutaj !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this._mat();
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
      let moveX = element[0];
      let moveY = element[1];
      if (this._boardModel[moveX][moveY]) {
        //jesli jest figura
        return this._boardModel[moveX][moveY]._side !== side; // innego koloru? true; tego samego? false
      }
      return true;
    });
  }

  doMove(squarePos) {
    const x = squarePos[0]; //pozycja x klikniecia
    const y = squarePos[1]; //pozycja y klikniecia
    const figX = this._markedFigure._x; //pozycja x figury
    const figY = this._markedFigure._y; //pozycja y figury

    this._markedFigure._x = x;
    this._markedFigure._y = y;
    this._markedFigure._pristine = false;

    this._boardModel[figX][figY] = null; //`${figX}, ${figY}`;
    this._boardModel[x][y] = this._markedFigure;

    this._boardView._displayPieces(this._boardModel);
    this.turn === "white" ? (this.turn = "black") : (this.turn = "white"); //kolej białych czy czarnych
  }
  doCastling(cords, a) {
    let sign;
    cords[1] > 4 ? (sign = -1) : (sign = 1);

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
    this._promotionContainer.hidden = true;

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}

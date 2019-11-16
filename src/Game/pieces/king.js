import Piece from "./piece";

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "King";
    this.display = `<i data-color=${side} class="fas fa-chess-king ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {
    // DIY
  }

  // Metoda pomocnicza do znalezienie wszystkich możliwych ruchów, które nie są przefiltrowane przez wszystkie ograniczenia.

  findAllMoves(x, y, moves_tab) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (!(i === x && j === y)) {
          moves_tab.push([i, j]);
        }
      }
    }
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    const all8moves = [];
    // const x = this._x; // row
    // const y = this._y; // column
    //const v = this._vector; // up/down
    // console.log(board);
    // Król jest najważniejszą, choć nie najsilniejszą figurą na szachownicy. Może poruszać się w każdym kierunku, ale tylko o jedno pole (również po skosach)
    const castling = function (x, y) {
      if (this._pristine === true) {
        if (board[x][y + 3] && board[x][y + 3]._pristine === true && (board[x][y + 1] === undefined || board[x][y + 1] === null) && (board[x][y + 2] === undefined || board[x][y + 2] === null)) {
          // console.log('wiezaaa2')
          all8moves.push([this._x, this._y + 2, true, x, y + 3]);
          // board[this._x][this._y + 2].castling = true;
          // console.log(board);

        }
        if (board[x][y - 4] && board[x][y - 4]._pristine === true && (board[x][y - 1] === undefined || board[x][y - 1] === null) && (board[x][y - 2] === undefined || board[x][y - 2] === null)) {
          // console.log('wiezaaa1');
          all8moves.push([this._x, this._y - 2, true, x, y - 4]);
          // console.log(board);
          // board.castling[this._x][this._y - 2] = true;
        }
      }
    }
    castling.call(this, this._x, this._y);


    this.findAllMoves(this._x, this._y, all8moves);

    let legalMoves = all8moves.filter(tab => {
      let resp;
      tab[0] >= 0 && tab[0] <= 7 && tab[1] >= 0 && tab[1] <= 7 ?
        (resp = true) :
        (resp = false);
      return resp;
    });
    return legalMoves;
    // legalMoves = this.filterOutBoardMoves(allMoves);
    // return legalMoves;
  }
}

export default King;
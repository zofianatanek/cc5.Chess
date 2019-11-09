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
    for (i = x - 1; i <= x + 1; i++) {
      for (j = y - 1; j <= y + 1; j++) {
        if (!(i === x && j === y)) {
          moves_tab.push([i, j]);
        }
      }
    }
  }


  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    console.log(board);
    // Król jest najważniejszą, choć nie najsilniejszą figurą na szachownicy. Może poruszać się w każdym kierunku, ale tylko o jedno pole (również po skosach)

    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down
    const all8moves = [];
    findAllMoves(x, y, all8moves);
    let legalMoves = all8moves.filter(tab => { let res; (tab[0] >= 0 && tab[0] <= 7 && tab[1] >= 0 && tab[1] <= 7) ? resp = true : resp = false; return resp });
    return legalMoves;
    // legalMoves = this.filterOutBoardMoves(allMoves);
    // return legalMoves;
  }

}

export default King;
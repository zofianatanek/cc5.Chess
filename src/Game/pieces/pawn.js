import Piece from "./piece";

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "pawn";
    this.display = `<i data-color=${side} class="fas fa-chess-pawn ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  _filterOutBoardMoves(possibleMoves) {
    return possibleMoves.filter(el => {
      return !(el[0] > 7 || el[0] < 0);
    });
  }

  // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
  findLegalMoves(board) {
    let legalMoves;
    const allMoves = Array([this._x + this._vector, this._y]);

    // Dla pierwszego ruchu możliwość ruchu o 2
    if (this._pristine) {
      allMoves.push([this._x + this._vector * 2, this._y]);
    }

    legalMoves = this._filterOutBoardMoves(allMoves);

    return legalMoves;
  }
}

export default Pawn;

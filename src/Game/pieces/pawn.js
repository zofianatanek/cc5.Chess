import Piece from "./piece";

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "pawn";
    this.display = `<i data-color=${side} class="fas fa-chess-pawn ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  findLegalMoves(board) {
    const moves = Array();

    if (!board[this._x + this._vector][this._y]) {
      moves.push([this._x + this._vector, this._y]);

      if (this._pristine && !board[this._x + this._vector * 2][this._y]) {
        moves.push([this._x + this._vector * 2, this._y]);
      }
    }

    return moves;
  }

  findLegalAttacks(board) {
    const attacks = Array(
      [this._x + this._vector, this._y + 1],
      [this._x + this._vector, this._y - 1]
    );

    attacks = this.filterOutBoardMoves(attacks);
    return attacks;
  }

  filterOutBoardMoves(possibleMoves) {
    return possibleMoves.filter(el => {
      return 0 <= el[0] && el[0] <= 7 && 0 <= el[1] && el[1] <= 7;
    });
  }
}

export default Pawn;

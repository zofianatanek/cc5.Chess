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

      const attacks = this.findLegalAttacks(board);
      moves.push(...attacks);

      return moves;
   }

   findLegalAttacks(board) {
      const attacks = [];

      if (board[this._x + this._vector][this._y + 1]) {
         attacks.push([this._x + this._vector, this._y + 1]);
      }
      if (board[this._x + this._vector][this._y - 1]) {
         attacks.push([this._x + this._vector, this._y - 1]);
      }

      console.log(board[this._x + this._vector][this._y + 1]);

      return attacks;
   }
}

export default Pawn;

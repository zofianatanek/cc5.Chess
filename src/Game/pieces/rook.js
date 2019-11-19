import Piece from "./piece";

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "rook";
    this.display = `<i data-color=${side} class="fas fa-chess-rook ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }


  collisions(availableMoves, board) {
    const nonCollisionMoves = [];
    for (let move of availableMoves) {
        // console.log(move)
        const x = move[0];
        const y = move[1];
        const side = this._side;
        if (!board[x][y]) {
          nonCollisionMoves.push(move);
        } else if (board[x][y]._side !== side) {
          nonCollisionMoves.push(move);
            break;
        } else {
            break;
        }
    }
    return nonCollisionMoves;
}

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    const x = this._x;
    const y = this._y;
    let allMoves = [];
    const moves = {
      up: [],
      down: [],
      left: [],
      right: []
    };

    for (let i = 1; i < 8; i++) {
        moves.up.push([x - i, y]);
        moves.down.push([x + i, y]);
        moves.left.push([x, y - i]);
        moves.right.push([x, y + i]);
    }

    const legalMoves = move => move.every(el => el >= 0 && el < 8);

    for (let nextMove in moves) {
      moves[nextMove] = moves[nextMove].filter(legalMoves);
      const possibleMove = this.collisions(moves[nextMove], board);
      allMoves.push(...possibleMove);
    }
    const movesNow = allMoves.filter(legalMoves);
    return movesNow;
  }

}

export default Rook;
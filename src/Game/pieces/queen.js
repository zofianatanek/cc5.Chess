import Piece from "./piece";

class Queen extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "queen";
    this.display = `<i data-color=${side} class="fas fa-chess-queen ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

    /*allMoves(x, y) {
      let moveUp = [];
      let moveDown = [];
      let moveRight = [];
      let moveLeft = [];
      let moveUpLeft = [];
      let moveUpRight = [];
      let moveDownLeft = [];
      let moveDownRight = [];
      let allMoves = [];
      for( let i = 1; i <= 7; i++){
        moveUp.push([x - i, y]);
        moveDown.push([x + i, y]);
        moveRight.push([x, y + i]);
        moveLeft.push([x, y - i]);
        moveUpLeft.push([x - i, y - i]);
        moveUpRight.push([x + i, y - i]);
        moveDownLeft.push([x - i, y + i]);
        moveDownRight.push([x + i, y + i]);
      }
      return allMoves = moveUp.concat(moveDown, moveRight, moveLeft, moveUpLeft, moveUpRight, moveDownLeft, moveDownRight);
    }*/

//zmodyfikowana metoda wyświetlająca wszystkie ruchy Hetmana bez kolizji z inną figurą
    allMoves(x, y) {
      let moveUp = [];
      let moveDown = [];
      let moveRight = [];
      let moveLeft = [];
      let moveUpLeft = [];
      let moveUpRight = [];
      let moveDownLeft = [];
      let moveDownRight = [];
      let allMoves = [];
      let moveUp = () => {
       for(let i = 1; i <= 7; i++){
         if (board[x - i, y] === 'false'){
          moveUp.push([x - i, y]);
         } else {
          return moveUp;
        }
      }
    }
     let moveDown = () => {
      for(let i = 1; i <= 7; i++){
       if (board[x + i, y] === 'false'){
        moveDown.push([x + i, y]);
      } else {
        return moveDown;
      }
    }
  }
let moveRight = () => {
  for(let i = 1; i <= 7; i++){
    if (board[x, y + i] === 'false'){
      moveRight.push([x, y + i]);
    } else {
      return moveRight;
    }
  }
}
let moveLeft = () => {
  for(let i = 1; i <= 7; i++){
    if (board[x, y - i] === 'false'){
      moveUpLeft.push([x, y - i]);
    } else {
      return moveLeft;
    }
  }
}
let moveUpLeft = () => {
  for(let i = 1; i <= 7; i++){
    if (board[x - i, y - i] === 'false'){
      moveUpLeft.push([x - i, y - i]);
    } else {
      return moveUpLeft;
    }
  }
}
let moveUpRight = () => {
  for(let i = 1; i <= 7; i++){
    if (board[x + i, y - i] === 'false'){
      moveUpRight.push([x + i, y - i]);
    } else {
      return moveUpRight;
    }
  }
}
let moveDownLeft = () => {
  for(let i = 1; i <= 7; i++){
    if (board[x - i, y + i] === 'false'){
      moveDownLeft.push([x - i, y + i]);
    } else {
      return moveDownLeft;
    }
  }
}
let moveDownRight = () => {
  for(let i = 1; i <= 7; i++){
    if (board[x + i, y + i] === 'false'){
      moveDownRight.push([x + i, y + i]);
    } else {
      return moveDownRight;
    }
  }
}
      return allMoves = moveUp.concat(moveDown, moveRight, moveLeft, moveUpLeft, moveUpRight, moveDownLeft, moveDownRight);
    }
  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {
  }
  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    console.log(board)
    const x = this._x;
    const y = this._y;
    let legalMoves = this.allMoves(x, y).filter(cell => {
      cell[0] >= 0 && cell[0] <= 7 && cell[1] >= 0 && cell[1] <= 7 
      ? (cell = true) : (cell = false);
    return cell;
    });
    return legalMoves; 
}

}
    // let legalMoves;
    // legalMoves = this.filterOutBoardMoves(allMoves);
    // return legalMoves;
  export default Queen;

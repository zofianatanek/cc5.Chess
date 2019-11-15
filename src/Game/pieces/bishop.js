import Piece from "./piece";

class Bishop extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "Bishop";
    this.display = `<i data-color=${side} class= "fas fa-chess-bishop ${side}"></i>`;
    this.vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Metoda filtrująca ruchy wychodzące poza szachownicę 
  filterMoves(arr) {
    let filteredMoves = arr.filter(elem => {
      elem[0] >= 0 && elem[0] <= 7 && elem[1] >= 0 && elem[1] <= 7
        ? (elem = true)
        : (elem = false);
      return elem;
    });
    return filteredMoves
  }

  // Metoda znajdująca wszystkie ruchy i zwracająca przefiltrowaną tablicę zawierającą 4 tablice z ruchami w możliwych kierunkach
  findAllMoves() {

    const x = this._x;
    const y = this._y;

    let upLeft = [];
    let upRight = [];
    let downLeft = [];
    let downRight = [];
    let allMoves = [];
    for (let i = 1; i < 8; i++) {
      upLeft.push([x - i, y - i]);
      downLeft.push([x + i, y - i]);
      upRight.push([x - i, y + i]);
      downRight.push([x + i, y + i]);
    }
    allMoves.push(this.filterMoves(upLeft), this.filterMoves(downLeft), this.filterMoves(upRight), this.filterMoves(downRight));
    return allMoves
  }

  // Metoda sprawdzająca czy na polach, po których porusza się goniec stoją inne figury
  checkTakenFields(arr, board) {
    let fields = [];
    for (let i = 0; i < arr.length; i++) {
      let y = arr[i][0];
      let x = arr[i][1];
      if (board[y][x] === (undefined || null) ? fields.push('empty') : fields.push('taken'));
    }
    return fields
  }

  // Metoda sprawdzająca czy zachodzą kolizje z innymi figurami na torze ruchu gońca i zwracająca indeks pola, na którym dochodzi do kolizji

  findCollisions(arr) {
    let collisionIndex = arr.findIndex(elem => {
      return elem == 'taken';
    })
    return collisionIndex
  }

  // Metoda ograniczająca tor ruchu gońca do pól, na których dochodzi do kolizji z innymi figurami (włącznie z tymi polami) i zwracająca tablice z ograniczonym torem ruchu

  delimitPathMoves(arr, index){
    if(index >= 0) {
      let delimitedMoves = arr.slice(0, [index + 1]);
      return delimitedMoves
    }
    else {
      return arr
    }
  }

  findLegalMoves(board) {
    let allMoves = this.findAllMoves()
    let delimitedMoves = []

    for (let i = 0; i < allMoves.length; i ++){
      var route = this.checkTakenFields(allMoves[i], board);
      var collisionIndex = this.findCollisions(route);
      var possibleMoves = this.delimitPathMoves(allMoves[i], collisionIndex);
      delimitedMoves.push(possibleMoves);
    }

    let legalMoves = delimitedMoves.flat();
    return legalMoves;
  }
}

export default Bishop;

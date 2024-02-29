export default class Board {
  constructor(width= 0, height = 0) {
    this.width = width;
    this.height = height;
    this.rows = []; // array of rows objects

    this.crrPiece = null; // piece object
    this.crrPieceAnchor = []; // defines the relative piece position
    this.crrPiecePositions = []; // bidimensional vector

    this.basePoints = 500; // used to calculate the scorre to update
  }
  addRow(row) { this.rows.push(row) }
  // recives an array of rows indexes and amount of rows to drop
  setDown(rowsToDrop) {
    // iterate from the ending to the beginning
    rowsToDrop.slice().reverse().forEach(([rowIndex, amount]) => {
      for (let x = 0; x < this.width; x++) {
        if (amount) {
          const isOcupated = this.rows[rowIndex].cells[x].isOcupated;
          this.rows[rowIndex].cells[x].isOcupated = false;
          this.rows[rowIndex + amount].cells[x].isOcupated = isOcupated;
        }
      }
    })
  }
  // afther the rows have been cleared, check how much the rows should be dropped
  dropRows(cleredRows) {
    const rowsToDrop = []

    for (let x = 0; x < this.rows.length; x++) {
      let drops = 0;
      cleredRows.forEach((rowIndex) => drops += rowIndex > x)

      rowsToDrop.push([x, drops])
    }

    this.setDown(rowsToDrop)
  }
  // update the scorre based on the amount of rows cleared at once (500, 2000, 4500, 8000 ...)
  changeScorre(amtRows) {
    return this.basePoints * amtRows ** 2;
  }
  // summon a piece in the board
  spawnPiece(piece) {
    this.crrPiecePositions = [];
    this.crrPiece = piece;
    let crrRow = 0;
    let hasSpawned = false;

    piece.mainShape.forEach((row) => {
      row.forEach((cell, i) => {
        if (cell) {
          hasSpawned = true;
          this.crrPiecePositions.push([crrRow, i + 0]);
          this.rows[crrRow].cells[i + 0].isOcupated = true;
        }
      })

      crrRow += hasSpawned;
    });

    this.crrPieceAnchor = [0, 0]
  }
  // recives an bidimensional vector of values and updates the crrPosition
  updatePosition(newPositions) {
    this.crrPiecePositions.forEach((crrPos) => {
      const [row, collum] = crrPos
      this.rows[row].cells[collum].isOcupated = false
    })

    newPositions.forEach((newPos) => {
      const [row, collum] = newPos
      this.rows[row].cells[collum].isOcupated = true
    })

    this.crrPiecePositions = newPositions;
  }
  // check if the new piece positions is not overlapin or out of boundaries
  checkNewPosition(newPos) {
    return newPos.every(([row, coll]) => {
      const isOutOfboundaries = row >= this.height || coll >= this.width || coll < 0;
      if (isOutOfboundaries) return false;

      const isOcupated = this.rows[row].cells[coll].isOcupated;
      const isItSelf = this.crrPiecePositions.find((pos) => {
        return pos[0] === row && pos[1] === coll
      });

      return (isItSelf || !isOcupated);
    });
  }
  // check if the anchor will not be out of boundaries
  updateAnchor(toAdd) {
    const peiceSize = this.crrPiece.mainShape.length
    const [crrRow, crrCollum] = this.crrPieceAnchor;
    const [rowPlus, collumPlus] = toAdd;

    const [newRow, newCollum] = [crrRow + rowPlus, crrCollum + collumPlus];
    const [maxRow, maxCollum] = [this.height - peiceSize, this.width - peiceSize];

    if (newRow >= 0 && newRow <= maxRow && newCollum >= 0 && newCollum <= maxCollum) {
      this.crrPieceAnchor = [newRow, newCollum];
    }
  }
  // check if it's possible to move down and call the freeze function if it's not
  moveDown() {
    const newPosition = []

    this.crrPiecePositions.forEach((pos) => {
      newPosition.push([pos[0] + 1, pos[1]])
    });

    if (this.checkNewPosition(newPosition)) {
      this.updatePosition(newPosition);
      this.updateAnchor([1, 0]);
    } else {
      this.freze();
    }
  }
  // check if it's possible to update the sideways position
  moveSideways(direction) {
    const newPosition = []

    this.crrPiecePositions.forEach((pos) => {
      newPosition.push([pos[0], pos[1] + direction])
    });

    if (this.checkNewPosition(newPosition)) {
      this.updatePosition(newPosition);
      this.updateAnchor([0, direction]);
    }
  }
  // get the next vector of rotations and set it in place
  rotate() {
    const orientantion = this.crrPiece.rotate();
    const [heightAnchor, widthAnchor] = this.crrPieceAnchor;

    const newPosition =  []

    orientantion.forEach((row, i) => {
      row.forEach((coll, x) => {
        if (coll) newPosition.push([i + heightAnchor, x + widthAnchor])
      }, [])
    })

    if (this.checkNewPosition(newPosition)) {
      this.updatePosition(newPosition);
    } else {
      this.crrPiece.reverseRotation()
    }
  }
  // freeze pieces in place, and check for any complete row
  freze() {
    const rowsToCheck = this.crrPiecePositions.map((pos) => pos[0], [])
    const rowsFilterd = []

    rowsToCheck.forEach((row) => {
      if (!rowsFilterd.includes(row)) rowsFilterd.push(row)
    })

    let cleredRows = [];

    rowsFilterd.forEach((row) => {
      if (this.rows[row].updateCellsCount())
        cleredRows.push(row)
    })

    this.dropRows(cleredRows);
    this.crrPiecePositions = []
    this.crrPiece.crrRotation = 0;
    return this.changeScorre(cleredRows.lenght)
  }
}

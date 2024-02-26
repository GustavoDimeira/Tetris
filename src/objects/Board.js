export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = []; // array of rows objects
  
    this.crrPiece = null; // piece object
    this.crrPieceAnchor = []; // defines the relative piece position
    this.crrPiecePositions = []; // bidimensional vector

    this.updateScorre = [];
    this.basePoints = 500; // used to calculate the scorre to update
  }
  addRow(row) { this.rows.push(row) }
  // recives an array of rows indexes and amount of rows to drop
  setDown(rowsToDrop) {  
    // iterate from the ending to the beginning
    rowsToDrop.slice().reverse().forEach(([ rowIndex, amount ]) => {
      for (let x =  0; x < this.width; x++) {
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
    // this.updateScorre((scorre) => scorre + this.basePoints * amtRows.length ** 2);
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
  // recive an bidimensional vector of values and updates the crrPosition
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
  // checks if it's possible to move down and call the freeze if it's not
  moveDown() {
    const newPositions = []
    let hasStoped = false;
    this.crrPiecePositions.forEach((pos) => {
      const [row, colum] = pos;

      if (row + 1 === this.height) {
        hasStoped = true;
        return
      }

      const isOcupated = this.rows[row + 1].cells[colum].isOcupated;

      // check if it's occupied and it's not a section of it self
      const isItSelf = this.crrPiecePositions.find((pos) => {
        return pos[0] === row + 1 && pos[1] === colum;
      })

      if (isOcupated && !isItSelf) {
        hasStoped = true;
        return
      }
      
      newPositions.push([row + 1, colum]);
    });
    
    if (hasStoped) {
      this.freze()
    } else {
      this.updatePosition(newPositions)
      this.updateAnchor([1, 0]);
    }
  }
  // checks if it's possible to update the sideways position
  moveSideways(direction) {
    const newPositions = []
    let isAvaliable = true;
    this.crrPiecePositions.forEach((pos) => {
      const [row, colum] = pos;

      const newPlace = colum + direction;
      if (newPlace === this.width || newPlace === -1) {
        isAvaliable = false;
        return;
      }

      const isOcupated = this.rows[row].cells[colum + direction].isOcupated

      // check if it's occupied and it's not a section of it self
      const isItSelf = this.crrPiecePositions.find((pos) => {
        return pos[0] === row && pos[1] === colum + direction
      })

      if (isOcupated && !isItSelf) {
        isAvaliable = false;
        return;
      }
      
      newPositions.push([row, colum + direction])
    });
    
    if (isAvaliable) {
      // update collum
      this.updatePosition(newPositions)
      this.updateAnchor([0, direction]);
    }
  }
  // check if the anchor will not be out of boundaries
  updateAnchor(toAdd) {
    const [crrRow, crrCollum] = this.crrPieceAnchor;
    const [rowPlus, collumPlus] = toAdd;

    const [newRow, newCollum] = [crrRow + rowPlus, crrCollum + collumPlus];
    const maxCollum = this.width - 1;

    if (newRow >= 0 && newCollum >= 0 && newCollum <= maxCollum) {
      this.crrPieceAnchor = [newRow, newCollum];
    }
  }
  // get the next vector of rotations and set it in place
  rotate() {
    const orientantion = this.crrPiece.rotate()
    const [heightAnchor, widthAnchor] = this.crrPieceAnchor;

    this.crrPiecePositions.forEach(([row, collum]) => {
      this.rows[row].cells[collum].isOcupated = false;      
    })
    
    this.crrPiecePositions = [];

    this.crrPiece.orientations[orientantion].forEach((row, height) => {
      row.forEach((cell, width) => {
        if (cell) {
          this.crrPiecePositions.push([height + heightAnchor, width + widthAnchor]);
          this.rows[height + heightAnchor].cells[width + widthAnchor].isOcupated = true;
        }
      })
    })
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

    this.changeScorre(cleredRows)
    this.dropRows(cleredRows);
  }
}

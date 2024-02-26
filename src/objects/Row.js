export default class Row {
  constructor(height = 0, width = 0) {
    this.height = height; // row position in the board
    this.width = width;
    this.cells = [] // list of Cells objects
  }

  addCell(cell) {
    this.cells.push(cell)
  }

  updateCellsCount() {
    let amount = 0;
    this.cells.forEach((cell) => (cell.isOcupated && (amount += 1)))

    if (amount === this.width) {
      this.clearCells(); 
      return true;
    }
    return false;
  }

  clearCells() {
    this.cells.forEach((cell) => cell.isOcupated = false)
  }
}

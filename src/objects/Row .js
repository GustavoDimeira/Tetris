export default class Row {
  constructor(height, width) {
    this.height = height; // row position
    this.width = width;
    this.cells = [] // list of Cells objects
    this.ocupatedCells = 0;
  }

  addCell(cell) {
    this.cells.push(cell)
  }

  updateCellsCount(cellPos) {
    this.cells[cellPos].isOcupated(true)

    this.ocupatedCells += 1;

    if (this.ocupatedCells === this.width) {
      this.breakRow(this.height);
    }
  }

  clearCells() {
    this.cells.forEach((cell) => cell.isOcupated = false)
  }
}

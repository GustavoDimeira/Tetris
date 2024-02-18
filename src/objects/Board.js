/* eslint-disable no-self-assign */

export default class Board {
  constructor(width, height, updateScorre) {
    this.width = width;
    this.height = height;
    this.updateScorre = updateScorre
    this.rows = []
    this.rowsToCelar = []
    this.crrPiece = []
    /*
      when updating a propriety of an instanciated objet in react, you need to create a copy of the original objetc by doing this -> const obj_copy = { ...originalObj }
      But this will not coppy the functions, only the variables, and that is why the faunctions are assinged to it self
    */
    this.addRow = this.addRow
    this.clearRows = this.clearRows
    this.changeScorre = this.changeScorre
    this.dropRows = this.dropRows
    this.spawnPiece = this.spawnPiece
    this.moveDown = this.moveDown
    this.moveSideways = this.moveSideways
    this.rotate = this.rotate
    this.freze = this.freze
  }

  addRow(row) { this.rows.push(row) }

  clearRows() {
    this.rowsToCelar.forEach((rowIndex) => {
      this.rows[rowIndex].clearCells()
    })
    this.changeScorre(this.rowsToCelar.length)
    this.clearRows = []
  }
  // 500, 2000, 4500, 8000, 12500, 18000
  changeScorre(ammRows) {
    const basePoints = 500;

    this.updateScorre((scorre) => scorre + basePoints * ammRows ** 2)
  }

  dropRows() {
    throw new Error("not implementated")
  }

  spawnPiece(piece) {
    let crrRow = 0;
    let indexesToSpawn = []

    piece.shape.forEach((row) => {
      let hasSpawned = false
      row.forEach((cell, i) => {
        if (cell) {
          hasSpawned = cell
          indexesToSpawn.push([crrRow, (i+2)])
        }
      })

      crrRow += hasSpawned
    })

    return indexesToSpawn
  }

  moveDown() {
    throw new Error("not implementated")
  }

  moveSideways() {
    throw new Error("not implementated")
  }

  rotate() {
    throw new Error("not implementated")
  }

  freze() {
    throw new Error("not implementated")
  }
}
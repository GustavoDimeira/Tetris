export class Piece {
  constructor(mainShape, color = 'yellow') {
    this.crrRotation = 0;
    this.color = color;

    this.mainShape = mainShape;
    this.right = this.rotateVector(this.mainShape)
    this.bottom = this.rotateVector(this.right)
    this.left = this.rotateVector(this.bottom)

    this.orientations = [
      this.mainShape, this.right, this.bottom, this.left
    ]
  }

  rotateVector = (vector) => {
    const height = vector.length;
    const width = vector[0].length;
  
    const newVector = [];
  
    for (let x = 0; x < width; x++) {
      newVector.push([]);

      for (let y = 0; y < height; y++) {
        newVector[x].push(vector[height - y - 1][x]);
      }
    }
  
    return newVector;
  }

  rotate() {
    // values varies from 0-3
    this.crrRotation = (this.crrRotation + 1) % 4;

    return this.crrRotation;
  }
}

export const I_shape = new Piece([
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
])

export const square_shape = new Piece([
  [1, 1],
  [1, 1],
])

export const L_Shape = new Piece([
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
])

export const J_shape = new Piece([
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
])

export const Z_shape = new Piece([
  [0, 1, 0],
  [1, 1, 0],
  [1, 0, 0],
])

export const S_shape = new Piece([
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
])

export const T_shape = new Piece([
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
])

export const test_shape = new Piece([
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
])

export const test2 = new Piece([
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
])

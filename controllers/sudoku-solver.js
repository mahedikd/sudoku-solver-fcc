class SudokuSolver {
  conflicts(puzzleString, row, column, value) {
    const board = this.transform(puzzleString);

    let match = true;

    if (board[row][column] !== value && board[row][column] !== 0) {
      match = false;
    }
    // return's false if there is a conflict
    const rowConflict = this.checkRowPlacement(puzzleString, row, column, value);
    const colConflict = this.checkColPlacement(puzzleString, row, column, value);
    const regionConflict = this.checkRegionPlacement(puzzleString, row, column, value);

    if (!rowConflict || !colConflict || !regionConflict) {
      match = false;
    }
    if (board[row][column] === value) {
      match = true;
    }
    return match;
  }

  validate(puzzleString) {
    if (/[^1-9.]/.test(puzzleString) || puzzleString.length !== 81) {
      return false;
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const board = this.transform(puzzleString);
    row = typeof row === 'number' ? row : this.rowToNum(row);

    for (let d = 0; d < board.length; d++) {
      if (board[row][column !== 'number' ? d : column] == value) return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const board = this.transform(puzzleString);
    row = typeof row === 'number' ? row : this.rowToNum(row);

    for (let r = 0; r < board.length; r++) {
      if (board[r !== 'number' ? r : row][column] == value) return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const board = this.transform(puzzleString);
    row = typeof row === 'number' ? row : this.rowToNum(row);

    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - (row % sqrt);
    let boxColStart = column - (column % sqrt);

    for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
      for (let d = boxColStart; d < boxColStart + sqrt; d++) {
        if (board[r][d] == value) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
      return false;
    }

    const board = this.transform(puzzleString);
    const solved = this.solveSudoku(board, 9);
    if (!solved) {
      return false;
    }

    const solvedString = this.transformBack(board);
    return solvedString;
  }

  isSafe(board, row, col, num) {
    for (let d = 0; d < board.length; d++) {
      if (board[row][d] == num) return false;
    }
    for (let r = 0; r < board.length; r++) {
      if (board[r][col] == num) return false;
    }

    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - (row % sqrt);
    let boxColStart = col - (col % sqrt);

    for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
      for (let d = boxColStart; d < boxColStart + sqrt; d++) {
        if (board[r][d] == num) return false;
      }
    }
    return true;
  }

  solveSudoku(board, n) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 0) {
          row = i;
          col = j;
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        break;
      }
    }
    if (isEmpty) return true;

    for (let num = 1; num <= n; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (this.solveSudoku(board, n)) {
          return true;
        } else {
          board[row][col] = 0;
        }
      }
    }
    return false;
  }

  transform(puzzleString) {
    let board = [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0],
    ];
    let row = -1;
    let col = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 === 0) {
        row++;
      }
      if (col % 9 === 0) {
        col = 0;
      }
      board[row][col] = puzzleString[i] === '.' ? 0 : +puzzleString[i];
      col++;
    }
    return board;
  }

  transformBack(board) {
    return board.flat().join('');
  }

  rowToNum(row) {
    let num;
    switch (row.toLowerCase()) {
      case 'a':
        num = 0;
        break;
      case 'b':
        num = 1;
        break;
      case 'c':
        num = 2;
        break;
      case 'd':
        num = 3;
        break;
      case 'e':
        num = 4;
        break;
      case 'f':
        num = 5;
        break;
      case 'g':
        num = 6;
        break;
      case 'h':
        num = 7;
        break;
      case 'i':
        num = 8;
        break;
    }
    return num;
  }
}

module.exports = SudokuSolver;

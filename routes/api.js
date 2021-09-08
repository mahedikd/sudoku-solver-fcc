'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required filed(s) missing' });
    }
    const row = coordinate.split('')[0];
    const col = coordinate.split('')[1];
    // chek coordinate
    if (coordinate.length !== 2 || /[^a-i]/i.test(row) || /[^1-9]/.test(col)) {
      return res.json({ error: 'Invalid coordinate' });
    }
    // check value
    if (/[^1-9]/.test(value) || value.length !== 1) {
      return res.json({ error: 'Invalid value' });
    }
    // check puzzle
    if (/[a-z]/i.test(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    const valNum = parseInt(value, 10);
    const colNum = parseInt(col, 10) - 1;
    const rowNum = rowToNum(row) - 1;
    const validCol = solver.checkColPlacement(puzzle, rowNum, colNum, valNum);
    const validReg = solver.checkRegionPlacement(puzzle, rowNum, colNum, valNum);
    const validRow = solver.checkRowPlacement(puzzle, rowNum, colNum, valNum);

    const conflict = [];

    if (validCol && validReg && validRow) {
      res.json({ valid: true });
    } else {
      if (!validRow) {
        conflict.push('row');
      }
      if (!validCol) {
        conflict.push('column');
      }
      if (!validReg) {
        conflict.push('region');
      }
      res.json({ valid: false, conflict });
    }
    //----
  });

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) {
      res.json({ error: 'Required field missing' });
      return;
    }
    if (puzzle.length !== 81) {
      res.json({ error: 'Expected puzzle to be 81 characters long' });
      return;
    }
    if (/[^1-9.]/.test(puzzle)) {
      res.json({ error: 'Invalid characters in puzzle' });
      return;
    }
    const result = solver.solve(puzzle);
    if (!result) {
      res.json({ error: 'Puzzle cannot be solved' });
      return;
    }
    res.json({ solution: result });
  });
};

function rowToNum(row) {
  let num;
  switch (row.toLowerCase()) {
    case 'a':
      num = 1;
      break;
    case 'b':
      num = 2;
      break;
    case 'c':
      num = 3;
      break;
    case 'd':
      num = 4;
      break;
    case 'e':
      num = 5;
      break;
    case 'f':
      num = 6;
      break;
    case 'g':
      num = 7;
      break;
    case 'h':
      num = 8;
      break;
    case 'i':
      num = 9;
      break;
  }
  return num;
}

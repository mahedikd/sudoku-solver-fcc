const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

let solver = new Solver();

const invalidPuzzleString =
  '1.5..2.84..63.12.7.2..5.....9..k....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const invalidPuzzleStringLessChar =
  '1.5..2.84..63.12.7.2..5.....9......8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const [validPuzzleString, validPuzzleStringAns] = require('../controllers/puzzle-strings').puzzlesAndSolutions[0];


suite('UnitTests', () => {
  // test 1
  test('Logic handles a valid puzzle string of 81 characters', (done) => {
    assert.equal(solver.solve(validPuzzleString), validPuzzleStringAns);
    done();
  });
  // test 2
  test('Logic handles a puzzle string with invalid characters', (done) => {
    assert.isBoolean(solver.solve(invalidPuzzleString));
    assert.isFalse(solver.solve(invalidPuzzleString));
    done();
  });
  // test 3
  test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
    assert.isBoolean(solver.solve(invalidPuzzleStringLessChar));
    assert.isFalse(solver.solve(invalidPuzzleStringLessChar));
    done();
  });
  // test 4
  test('Logic handles a valid row placement', (done) => {
    assert.isBoolean(solver.checkRowPlacement(validPuzzleString, 'a', 2, 9));
    assert.isTrue(solver.checkRowPlacement(validPuzzleString, 'a', 2, 9));
    done();
  });
  // test 5
  test('Logic handles an invalid row placement', (done) => {
    assert.isBoolean(solver.checkRowPlacement(validPuzzleString, 'a', 2, 1));
    assert.isFalse(solver.checkRowPlacement(validPuzzleString, 'a', 2, 1));
    done();
  });
  // test 6
  test('Logic handles a valid column placement', (done) => {
    assert.isBoolean(solver.checkColPlacement(validPuzzleString, 'a', 2, 8));
    assert.isTrue(solver.checkColPlacement(validPuzzleString, 'a', 2, 8));
    done();
  });
  // test 7
  test('Logic handles an invalid column placement', (done) => {
    assert.isBoolean(solver.checkColPlacement(validPuzzleString, 'a', 2, 1));
    assert.isFalse(solver.checkColPlacement(validPuzzleString, 'a', 2, 1));
    done();
  });
  // test 8
  test('Logic handles a valid region (3x3 grid) placement', (done) => {
    assert.isBoolean(solver.checkRegionPlacement(validPuzzleString, 'a', 2, 3));
    assert.isTrue(solver.checkRegionPlacement(validPuzzleString, 'a', 2, 3));
    done();
  });
  // // test 9
  test('Logic handles an invalid region (3x3 grid) placement', (done) => {
    assert.isBoolean(solver.checkRegionPlacement(validPuzzleString, 'a', 2, 1));
    assert.isFalse(solver.checkRegionPlacement(validPuzzleString, 'a', 2, 1));
    done();
  });
  // test 10
  test('Valid puzzle strings pass the solver', (done) => {
    assert.equal(solver.solve(validPuzzleString), validPuzzleStringAns);
    done();
  });
  // test 11
  test('Invalid puzzle strings fail the solver', (done) => {
    assert.isBoolean(solver.solve(invalidPuzzleString));
    assert.isFalse(solver.solve(invalidPuzzleString));
    done();
  });
  // test 12
  test('Solver returns the expected solution for an incomplete puzzle', (done) => {
    assert.equal(solver.solve(validPuzzleString), validPuzzleStringAns);
    done();
  });
  // -
});

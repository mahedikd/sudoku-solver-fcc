const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const checkEndPoint = '/api/check';
const solveEndPoint = '/api/solve';

const [validPuzzleString, validPuzzleStringAns] = require('../controllers/puzzle-strings')
  .puzzlesAndSolutions[0];

suite('Functional Tests', () => {
  // test 1
  test('Solve a puzzle with valid puzzle string', (done) => {});
  // test 2
  test('Solve a puzzle with missing puzzle string', (done) => {});
  // test 3
  test('Solve a puzzle with invalid characters', (done) => {});
  // test 4
  test('Solve a puzzle with incorrect length', (done) => {});
  // test 5
  test('Solve a puzzle that cannot be solved', (done) => {});
  // test 6
  test('Check a puzzle placement with all fields', (done) => {});
  // test 7
  test('Check a puzzle placement with single placement conflict', (done) => {});
  // test 8
  test('Check a puzzle placement with multiple placement conflicts', (done) => {});
  // test 9
  test('Check a puzzle placement with all placement conflicts', (done) => {});
  // test 10
  test('Check a puzzle placement with missing required fields', (done) => {});
  // test 11
  test('Check a puzzle placement with invalid characters', (done) => {});
  // test 12
  test('Check a puzzle placement with incorrect length', (done) => {});
  // test 13
  test('Check a puzzle placement with invalid placement coordinate', (done) => {});
  //test 14
  test('Check a puzzle placement with invalid placement value', (done) => {});
});

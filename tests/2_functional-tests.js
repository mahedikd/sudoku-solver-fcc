const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const checkEndPoint = '/api/check';
const solveEndPoint = '/api/solve';

const [validPuzzleString, validPuzzleStringAns] = require('../controllers/puzzle-strings')
  .puzzlesAndSolutions[0];

const invalidPuzzleString =
  '1.5..2.84..63.12.7.2..5.....9..k....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const invalidPuzzleStringLessChar =
  '1.5..2.84..63.12.7.2..5.....9......8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const puzzNotSolAbl =
  '1.5..2.84..63.12.7.2..5.....9..3....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
suite('Functional Tests', () => {
  suite('/api/solve route', () => {
    // // test 1
    test('Solve a puzzle with valid puzzle string', (done) => {
      chai
        .request(server)
        .post(solveEndPoint)
        .send({ puzzle: validPuzzleString })
        .end((err, res) => {
          assert.equal(res.body.solution, validPuzzleStringAns);
          done();
        });
    });
    // // test 2
    test('Solve a puzzle with missing puzzle string', (done) => {
      chai
        .request(server)
        .post(solveEndPoint)
        .send({ puzzle: '' })
        .end((err, res) => {
          assert.equal(res.body.error, 'Required field missing');
          done();
        });
    });
    // // test 3
    test('Solve a puzzle with invalid characters', (done) => {
      chai
        .request(server)
        .post(solveEndPoint)
        .send({ puzzle: invalidPuzzleString })
        .end((err, res) => {
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });
    // // test 4
    test('Solve a puzzle with incorrect length', (done) => {
      chai
        .request(server)
        .post(solveEndPoint)
        .send({ puzzle: invalidPuzzleStringLessChar })
        .end((err, res) => {
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });
    // // test 5
    test('Solve a puzzle that cannot be solved', (done) => {
      chai
        .request(server)
        .post(solveEndPoint)
        .send({ puzzle: puzzNotSolAbl })
        .end((err, res) => {
          assert.equal(res.body.error, 'Puzzle cannot be solved');
          done();
        });
    });
  });
  suite('/api/check route', () => {
    // // test 6
    test('Check a puzzle placement with all fields', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: 'A1', value: '7' })
        .end((err, res) => {
          assert.isTrue(res.body.valid);
          done();
        });
    });
    // // test 7
    test('Check a puzzle placement with single placement conflict', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: 'B1', value: '7' })
        .end((err, res) => {
          assert.isFalse(res.body.valid);
          done();
        });
    });
    // // test 8
    test('Check a puzzle placement with multiple placement conflicts', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: 'A1', value: '4' })
        .end((err, res) => {
          assert.isFalse(res.body.valid);
          assert.isArray(res.body.conflict);
          done();
        });
    });
    // // test 9
    test('Check a puzzle placement with all placement conflicts', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: 'B1', value: '2' })
        .end((err, res) => {
          assert.isFalse(res.body.valid);
          assert.isArray(res.body.conflict);
          assert.equal(res.body.conflict.length, 3);
          done();
        });
    });
    // // test 10
    test('Check a puzzle placement with missing required fields', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: '', value: '2' })
        .end((err, res) => {
          assert.equal(res.body.error, 'Required field(s) missing');
          done();
        });
    });
    // // test 11
    test('Check a puzzle placement with invalid characters', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: invalidPuzzleString, coordinate: 'A1', value: '7' })
        .end((err, res) => {
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });
    // // test 12
    test('Check a puzzle placement with incorrect length', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: invalidPuzzleStringLessChar, coordinate: 'A1', value: '7' })
        .end((err, res) => {
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });
    // // test 13
    test('Check a puzzle placement with invalid placement coordinate', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: 'Aa', value: '7' })
        .end((err, res) => {
          assert.equal(res.body.error, 'Invalid coordinate');
          done();
        });
    });
    // //test 14
    test('Check a puzzle placement with invalid placement value', (done) => {
      chai
        .request(server)
        .post(checkEndPoint)
        .send({ puzzle: validPuzzleString, coordinate: 'A1', value: '0' })
        .end((err, res) => {
          assert.equal(res.body.error, 'Invalid value');
          done();
        });
    });
  });
});

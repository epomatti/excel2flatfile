const program = require('./program');

// Loads test .env
require('dotenv').config({ path: 'test/test.env' })

test('minimum', () => {
    expected = '0001';
    actual = program.generateSequence('1');
    expect(actual).toBe(expected);
});

test('max', () => {
    expected = '1234';
    actual = program.generateSequence('1234');
    expect(actual).toBe(expected);
});

test('exceptions', () => {
    t = () => {
        program.generateSequence('12345');
    }
    expect(t).toThrow(Error);

    t = () => {
        program.generateSequence('');
    }
    expect(t).toThrow(Error);

    t = () => {
        program.generateSequence(undefined);
    }
    expect(t).toThrow(Error);
});

test('dc', () => {
    expected = 'JJJJ';
    actual = program.getDistributionCenter();
    expect(actual).toBe(expected);
});

test('greater', () => {
    expected = '6845106078          90070846                                           0330                               JJJJ\r\n'
    actual = program.buildTxtLine(['', '6845106078', '90070846', '330']);
    expect(actual).toBe(expected);
});
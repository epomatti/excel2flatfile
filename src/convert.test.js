const convert = require('./convert');

test('shorter', () => {
    expected = '0123';
    actual = convert.generateSequence('123');
    expect(actual).toBe(expected);
});

test('greater', () => {
    expected = '1234';
    actual = convert.generateSequence('1234');
    expect(actual).toBe(expected);
});

test('exceptions', () => {
    t = () => {
        convert.generateSequence('12345');
    }
    expect(t).toThrow(Error);

    t = () => {
        convert.generateSequence('45');
    }
    expect(t).toThrow(Error);

    t = () => {
        convert.generateSequence(undefined);
    }
    expect(t).toThrow(Error);
});

test('greater', () => {
    expected = '6845106078          90070846                                           0330                               BRFJ\r\n'
    actual = convert.buildTxtLine(['', '6845106078', '90070846', '330']);
    expect(actual).toBe(expected);
});
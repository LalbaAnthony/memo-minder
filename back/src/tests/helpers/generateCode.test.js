const generateCode = require('../../helpers/generateCode');
const code = generateCode();

test('Check if the code is an integer', () => {
    expect(Number.isInteger(code)).toBe(true);
});

test('Check if the code is 6 digits long', () => {
    expect(code.toString().length).toBe(6);
});

test('Check if the code is a positive number', () => {
    expect(code).toBeGreaterThan(0);
});

test('Check if the code is less than 1000000', () => {
    expect(code).toBeLessThan(1000000);
});
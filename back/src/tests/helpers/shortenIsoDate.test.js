const isoDateToDate = require('../../helpers/shortenIsoDate');

test('Check if the date is formatted correctly', () => {
    const date = isoDateToDate('2021-12-31T23:59:59.999Z');
    expect(date).toBe('2021-12-31');
});
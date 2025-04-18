const moodController = require('../../controllers/moodController');

test('Check if the controller is an object', () => {
    expect(typeof moodController).toBe('object');
});
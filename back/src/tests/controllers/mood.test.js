const moodController = require('../../controllers/moodController');

test('Check if the mood controller is an object', () => {
    expect(typeof moodController).toBe('object');
});

test('Check if the mood controller getAllMoods method is defined and return data', async () => {
    const req = {
        query: {
            userId: 1,
        },
    };
    
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };
    
    await moodController.getAllMoods(req, res);
    expect(moodController.getAllMoods).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
});

test('Check if the mood controller getMoodById method is defined and return data', async () => {
    const req = {
        query: {
            userId: 1,
        },
        params: {
            id: 1,
        },
    };
    
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };
    
    await moodController.getMoodById(req, res);
    expect(moodController.getMoodById).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
});
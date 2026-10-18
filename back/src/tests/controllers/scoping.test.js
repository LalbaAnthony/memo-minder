// Custom (non-baseController) handlers must scope their queries to the authenticated user
jest.mock('../../database', () => ({
    Person: { count: jest.fn().mockResolvedValue(0), findAll: jest.fn().mockResolvedValue([]) },
    Season: { findAll: jest.fn().mockResolvedValue([]) },
    Music: {},
    Event: {},
    Mood: {},
}));

const { Person, Season } = require('../../database');
const personController = require('../../controllers/personController');
const seasonController = require('../../controllers/seasonController');

const OWNER_ID = 1;

const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
};

const mockReq = (query = {}) => ({ user: { userId: OWNER_ID }, query });

test('upcoming birthdays ignore the userId query param', async () => {
    const res = mockRes();
    await personController.getUpcommingBirthdaysPeople(mockReq({ userId: '2' }), res);

    expect(Person.count.mock.calls[0][0].where.userId).toBe(OWNER_ID);
    expect(Person.findAll.mock.calls[0][0].where.userId).toBe(OWNER_ID);
    expect(res.status).toHaveBeenCalledWith(200);
});

test('current season ignores the userId query param', async () => {
    const res = mockRes();
    await seasonController.getCurrentSeason(mockReq({ userId: '2' }), res);

    expect(Season.findAll.mock.calls[0][0].where.userId).toBe(OWNER_ID);
    expect(res.status).toHaveBeenCalledWith(200);
});

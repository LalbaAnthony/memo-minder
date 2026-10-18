jest.mock('../../database', () => ({
    User: { findByPk: jest.fn() },
}));

const { User } = require('../../database');
const userController = require('../../controllers/userController');

const OWNER_ID = 1;

const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
};

const mockReq = (id, body = {}) => ({ user: { userId: OWNER_ID }, params: { id }, body });

const mockUser = () => ({
    userId: OWNER_ID,
    dataValues: { userId: OWNER_ID, password: 'hash' },
    update: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(1),
});

describe('userController ownership', () => {
    beforeEach(() => {
        User.findByPk.mockReset();
    });

    test.each([
        ['userInfos'],
        ['userUpdate'],
        ['userDelete'],
    ])('%s refuses another account without touching the database', async (handler) => {
        const res = mockRes();
        await userController[handler](mockReq('2', { username: 'x' }), res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(User.findByPk).not.toHaveBeenCalled();
    });

    test('userInfos returns the authenticated user without the password', async () => {
        User.findByPk.mockResolvedValue(mockUser());
        const res = mockRes();
        await userController.userInfos(mockReq(String(OWNER_ID)), res);

        expect(User.findByPk).toHaveBeenCalledWith(OWNER_ID);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls[0][0].data.dataValues).not.toHaveProperty('password');
    });

    test('userDelete deletes the authenticated user', async () => {
        const user = mockUser();
        User.findByPk.mockResolvedValue(user);
        const res = mockRes();
        await userController.userDelete(mockReq(String(OWNER_ID)), res);

        expect(User.findByPk).toHaveBeenCalledWith(OWNER_ID);
        expect(user.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

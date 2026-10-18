const jwt = require('jsonwebtoken');
const checkToken = require('../../middlewares/auth');

const SECRET = 'test-secret';

const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
};

const run = async (headers = {}) => {
    const req = { headers };
    const res = mockRes();
    const next = jest.fn();
    await checkToken(req, res, next);
    return { req, res, next };
};

describe('auth middleware', () => {
    const env = { ...process.env };

    beforeEach(() => {
        process.env.BACK_TOKEN_SECRET_KEY = SECRET;
    });

    afterEach(() => {
        process.env = { ...env };
    });

    test('rejects a request without authorization header', async () => {
        const { res, next } = await run();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('rejects a token signed with another secret', async () => {
        const token = jwt.sign({ userId: 1 }, 'another-secret');
        const { res, next } = await run({ authorization: `Bearer ${token}` });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('rejects a valid token that carries no userId', async () => {
        const token = jwt.sign({ foo: 'bar' }, SECRET);
        const { res, next } = await run({ authorization: `Bearer ${token}` });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('sets req.user from a valid token', async () => {
        const token = jwt.sign({ userId: 7 }, SECRET);
        const { req, res, next } = await run({ authorization: `Bearer ${token}` });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(req.user.userId).toBe(7);
    });

    test('bypass mode skips the signature check but still takes the identity from the token', async () => {
        const token = jwt.sign({ userId: 3 }, 'another-secret');
        const { req, next } = await run({ authorization: `Bearer ${token}` });
        expect(next).toHaveBeenCalled();
        expect(req.user.userId).toBe(3);
    });

    test('bypass mode still requires a token', async () => {
        const { res, next } = await run();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });
});

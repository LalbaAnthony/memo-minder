const baseController = require('../../composables/baseController');

const OWNER_ID = 1;
const OTHER_ID = 2;

const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
};

const mockReq = ({ params = {}, query = {}, body = {} } = {}) => ({
    user: { userId: OWNER_ID },
    params,
    query,
    body,
});

// Minimal stand-in for a Sequelize model with one many-to-many association ("musics")
const mockModel = () => {
    const Music = {
        name: 'Music',
        primaryKeyAttribute: 'musicId',
        count: jest.fn(),
    };
    return {
        name: 'Event',
        primaryKeyAttribute: 'eventId',
        associations: { musics: { target: Music } },
        count: jest.fn().mockResolvedValue(0),
        findAll: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
        Music,
    };
};

const mockItem = (data = {}) => ({
    eventId: 5,
    userId: OWNER_ID,
    ...data,
    update: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(1),
    setMusics: jest.fn().mockResolvedValue(),
});

describe('baseController.getAll', () => {
    test('scopes the query to the authenticated user and ignores the userId query param', async () => {
        const Model = mockModel();
        const res = mockRes();
        await baseController.getAll(Model)(mockReq({ query: { userId: String(OTHER_ID) } }), res);

        expect(Model.count.mock.calls[0][0].where.userId).toBe(OWNER_ID);
        expect(Model.findAll.mock.calls[0][0].where.userId).toBe(OWNER_ID);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('baseController.getById', () => {
    test('rejects a malformed id', async () => {
        const Model = mockModel();
        const res = mockRes();
        await baseController.getById(Model)(mockReq({ params: { id: '5abc' } }), res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(Model.findOne).not.toHaveBeenCalled();
    });

    test('looks the record up within the authenticated user rows and answers 404 otherwise', async () => {
        const Model = mockModel();
        const res = mockRes();
        await baseController.getById(Model)(mockReq({ params: { id: '5' }, query: { userId: String(OTHER_ID) } }), res);

        expect(Model.findOne.mock.calls[0][0].where).toEqual({ eventId: 5, userId: OWNER_ID });
        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('returns an owned record', async () => {
        const Model = mockModel();
        Model.findOne.mockResolvedValue(mockItem());
        const res = mockRes();
        await baseController.getById(Model)(mockReq({ params: { id: '5' } }), res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('baseController.create', () => {
    const options = { requiredFields: ['title'], toSetAssociations: ['musics'] };

    test('forces the owner to the authenticated user', async () => {
        const Model = mockModel();
        Model.create.mockResolvedValue(mockItem());
        const res = mockRes();
        await baseController.create(Model, options)(mockReq({ body: { title: 'A', userId: OTHER_ID } }), res);

        expect(Model.create.mock.calls[0][0].userId).toBe(OWNER_ID);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test('refuses to link records the user does not own, before inserting anything', async () => {
        const Model = mockModel();
        Model.Music.count.mockResolvedValue(1);
        const res = mockRes();
        await baseController.create(Model, options)(mockReq({ body: { title: 'A', musics: [3, 4] } }), res);

        expect(Model.Music.count.mock.calls[0][0].where).toEqual({ musicId: [3, 4], userId: OWNER_ID });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(Model.create).not.toHaveBeenCalled();
    });

    test('refuses malformed association ids', async () => {
        const Model = mockModel();
        const res = mockRes();
        await baseController.create(Model, options)(mockReq({ body: { title: 'A', musics: [{ musicId: 3 }] } }), res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(Model.Music.count).not.toHaveBeenCalled();
        expect(Model.create).not.toHaveBeenCalled();
    });

    test('links owned records, deduplicating ids', async () => {
        const Model = mockModel();
        const item = mockItem();
        Model.create.mockResolvedValue(item);
        Model.Music.count.mockResolvedValue(2);
        const res = mockRes();
        await baseController.create(Model, options)(mockReq({ body: { title: 'A', musics: [3, '4', 3] } }), res);

        expect(Model.create.mock.calls[0][0]).not.toHaveProperty('musics');
        expect(item.setMusics).toHaveBeenCalledWith([3, 4]);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test('an empty list clears the links without querying', async () => {
        const Model = mockModel();
        const item = mockItem();
        Model.create.mockResolvedValue(item);
        const res = mockRes();
        await baseController.create(Model, options)(mockReq({ body: { title: 'A', musics: [] } }), res);

        expect(Model.Music.count).not.toHaveBeenCalled();
        expect(item.setMusics).toHaveBeenCalledWith([]);
    });
});

describe('baseController.update', () => {
    const options = { requiredFields: ['title'], toSetAssociations: ['musics'] };

    test('answers 404 for a record the user does not own', async () => {
        const Model = mockModel();
        const res = mockRes();
        await baseController.update(Model, options)(mockReq({ params: { id: '5' }, body: { title: 'A' } }), res);

        expect(Model.findOne.mock.calls[0][0].where).toEqual({ eventId: 5, userId: OWNER_ID });
        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('cannot transfer the record to another user', async () => {
        const Model = mockModel();
        const item = mockItem();
        Model.findOne.mockResolvedValue(item);
        const res = mockRes();
        await baseController.update(Model, options)(mockReq({ params: { id: '5' }, body: { title: 'A', userId: OTHER_ID } }), res);

        expect(item.update.mock.calls[0][0].userId).toBe(OWNER_ID);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('refuses to link records the user does not own, before updating anything', async () => {
        const Model = mockModel();
        const item = mockItem();
        Model.findOne.mockResolvedValue(item);
        Model.Music.count.mockResolvedValue(0);
        const res = mockRes();
        await baseController.update(Model, options)(mockReq({ params: { id: '5' }, body: { title: 'A', musics: [9] } }), res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(item.update).not.toHaveBeenCalled();
        expect(item.setMusics).not.toHaveBeenCalled();
    });
});

describe('baseController.remove', () => {
    test('answers 404 for a record the user does not own', async () => {
        const Model = mockModel();
        const res = mockRes();
        await baseController.remove(Model)(mockReq({ params: { id: '5' } }), res);

        expect(Model.findOne.mock.calls[0][0].where).toEqual({ eventId: 5, userId: OWNER_ID });
        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('deletes an owned record', async () => {
        const Model = mockModel();
        const item = mockItem();
        Model.findOne.mockResolvedValue(item);
        const res = mockRes();
        await baseController.remove(Model)(mockReq({ params: { id: '5' } }), res);

        expect(item.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

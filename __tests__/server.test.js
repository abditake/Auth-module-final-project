const jwt = require('jsonwebtoken');
const { users, db } = require('../src/auth/models');
const SECRET = process.env.API_SECRET || 'ThisIsMySecret';

beforeAll (async () => {
  await db.sync();
});

afterAll (async () => {
  await db.drop();
  // if tests aren't passing maybe its a multiple - async issue
  // await sequelize.close();
});

describe('UsersModel Tests', () => {
  test('User should have a token', async () => {
    const testUser = await users.create({username: 'Abdinasir', password: 'pass123'});
    const { token } = testUser;
    const validToken = jwt.verify(testUser.token , SECRET);

    expect(token).toBeTruthy();
    expect(validToken).toBeTruthy();
  });
});

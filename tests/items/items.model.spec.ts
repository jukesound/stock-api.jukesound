import { config as dotenvConfig } from 'dotenv';
import * as request from 'supertest';

import config from '@config/index';
import sequelize from '@database/index';
import app from 'app';
import ItemsFactory from '@database/factory/ItemsFactory';

dotenvConfig();

describe('Routes', () => {
  beforeEach(async () => {
    // connect to database
    await sequelize.authenticate();
    // reset database
    await sequelize.sync({ force: true, });
  });

  it('GET ' + config.routes.items.path + ' ' + config.httpCode.ok + ' - all fields filled', async () => {
    // Create 2 items
    const expectedItems = await ItemsFactory.allFields().save();
    const expectedItems2 = await ItemsFactory.allFields().save();

    // route: GET /items
    const res = await request(app)
      .get(config.routes.items.path);

    // tests
    expect(res.status).toBe(config.httpCode.ok);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toMatchObject(expectedItems.dataValues);
    expect(res.body[1]).toMatchObject(expectedItems2.dataValues);
  });

  it('POST ' + config.routes.items.path + ' ' + config.httpCode.ok + ' - all fields filled', async () => {
    // Mock body
    const body = await ItemsFactory.allFields().dataValues;
    delete body.id; // don't send id

    // route: GET /items
    const res = await request(app)
      .post(config.routes.items.path)
      .send(body);

    // tests
    expect(res.status).toBe(config.httpCode.created);
    expect(res.body).toMatchObject(body);
  });

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await sequelize.close();
    done();
  });
});

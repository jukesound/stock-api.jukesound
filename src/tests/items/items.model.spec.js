import { config as dotenvConfig } from 'dotenv';
import request from 'supertest';

import config from 'config';
import sequelize from 'database';
import app from '/app.js';
import ItemsFactory from 'database/factory/ItemsFactory';
import Items from 'models/items.model';

dotenvConfig();

describe('global description', () => {
  beforeEach(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true, });
  });

  it('[GET] - all fields', async () => {
    // Create 2 items
    const expectedItems = await ItemsFactory.allFields().save();
    const expectedItems2 = await ItemsFactory.allFields().save();

    // route: GET /items
    const res = await request(app).get(config.routes.items.path);

    expect(res.status).toBe(config.httpCode.ok);
    expect(res.body.length).toBe(2);
    expect(res.body[0].id).toBe(expectedItems.id);
    expect(res.body[1].id).toBe(expectedItems2.id);
    res.body[0].id = 'je suis une erreur';
    console.log(Items.validators(res.body[0]));
  });

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await sequelize.close();
    done();
  });
});

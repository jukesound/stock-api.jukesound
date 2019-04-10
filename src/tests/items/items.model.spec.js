import { config } from 'dotenv';
import sequelize from 'database';
import request from 'supertest';

import app from '../../../app.js';
import ItemsFactory from 'database/factory/ItemsFactory';
import Items from 'models/items.model';

config();

describe('global description', () => {
  beforeEach(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true, });
  });

  it('[GET] - all fields', async () => {
    const expectedItems = ItemsFactory.allFields();
    await expectedItems.save();

    const expectedItems2 = await ItemsFactory.allFields().save();

    const res = await request(app).get('/items');
    // console.log(res.body);

    expect(res.status).toBe(200);
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

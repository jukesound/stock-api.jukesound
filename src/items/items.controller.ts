import * as express from 'express';

import config from '@config/index';
import ItemsModel from '@src/items/items.model';
import CreateItemDto from '@src/items/dto/create-item.dto';

class ItemController {
  /**
   * Get all items
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<CreateItemDto[]>}
   */
  static async all (req: express.Request, res: express.Response): Promise<any> {
    // [Get] all items
    const body = await ItemsModel.findAll();

    // [Send] all items
    res.status(config.httpCode.ok).json(body);
  }

  /**
   * Get items by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<CreateItemDto>}
   */
  static async get (req: express.Request, res: express.Response): Promise<any> {
    // [Get] item
    const body = await ItemsModel.findByPk(req.params.id);

    // [Send] item selected
    res.status(config.httpCode.ok).json(body);
  }

  /**
   * Create new items
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<CreateItemDto>}
   */
  static async post (req: express.Request, res: express.Response): Promise<any> {
    // Mutate body
    const mutatedBody = await ItemsModel.itemChanged(
      req.body,
      config.ObserverTypeEnum.POST_ITEM
    );

    // [Post] new item in db
    const body = await ItemsModel.create(mutatedBody);

    // [Send] item created
    res.status(config.httpCode.created).json(body);
  }

  /**
   * Update item by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<CreateItemDto>}
   */
  static async update (req: express.Request, res: express.Response): Promise<any> {
    // Mutate body
    const mutatedBody = await ItemsModel.itemChanged(
      req.body,
      config.ObserverTypeEnum.UPDATE_ITEM
    );

    // [Get] item by id
    const item = await ItemsModel.findByPk(req.params.id);

    // [Update] item selected
    await item.update(mutatedBody);

    // [Send] item updated
    res.json(item);
  }

  /**
   * Delete item by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<CreateItemDto>}
   */
  static async delete (req: express.Request, res: express.Response): Promise<any> {
    // [Get] item by id
    const item = await ItemsModel.findByPk(req.params.id);

    // [Delete] item in db
    await item.destroy();

    // [Send] item destroyed
    res.status(config.httpCode.ok).json(item);
  }
}

export default ItemController;
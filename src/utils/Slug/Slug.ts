import { ItemDto } from '@dto/index';

/**
 * Slug manipulation
 */
class Slug {
  /**
   * Add slug field to object
   * @param {ItemDto} body - Object with name or slug attribute
   * @example
   * import Slug from "utils/Slug/Slug"
   *
   * const req = {
   *   body: {
   *     name: "My title",
   *     quantity: 2
   *   }
   * }
   *
   * const body = Slug.addSlug(req.body);
   *
   * // body = {
   * //   name: "My title",
   * //   slug: "my-title",
   * //   quantity: 2
   * // }
   *
   * @returns {Object} Returns same object + slug field
   */
  public static addSlug (body: ItemDto): ItemDto {
    // [Stop] return same object if can't build slug
    if (!this._canBuildSlug(body)) {
      return body;
    }

    // [Stop] return object with slug
    return {
      ...body,
      ...this._buildSlug(body),
    };
  }

  /**
   * Transform string into slug
   *
   * @param {string} text
   * @returns {string}
   */
  public static slugify (text: string): string {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    /* eslint-disable */
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  /**
   * Create object with slug field
   *
   * @param {ItemDto} body
   *
   * @returns {{slug: string}}
   *
   * @private
   */
  public static _buildSlug (body: ItemDto): {slug: string} {
    const name = body.slug || body.name;

    return {
      'slug': this.slugify(name),
    };
  }

  /**
   * Check if can build slug with body object
   *
   * @param {ItemDto} body
   *
   * @returns {boolean}
   *
   * @private
   */
  static _canBuildSlug (body: ItemDto): boolean {
    if (body.name && !body.slug) {
      return true;
    }
    if (body.slug && !body.name) {
      if (body.slug !== this.slugify(body.slug)) {
        return true;
      }
    }
    if (body.slug && body.name) {
      if (body.slug !== this.slugify(body.slug)) {
        return true;
      }
    }

    return false;
  }
}

export default Slug;

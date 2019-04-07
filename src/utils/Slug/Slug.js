class Slug {
  static addSlug(body) {
    let mutableBody = {
      ...body,
    };

    if (this._canBuildSlug(body)) {
      mutableBody = {
        ...mutableBody,
        ...this._buildSlug(body),
      }
    }

    return mutableBody
  }
  static slugify(string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
  static _buildSlug(body) {
    const string = body.slug || body.name;

    return {
      "slug": this.slugify(string),
    }
  }
  static _canBuildSlug(body){
    if (body.name && !body.slug){
      return true;
    }
    if (body.slug && !body.name){
      if (body.slug !== this.slugify(body.slug)){
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

export default Slug
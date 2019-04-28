interface ItemInterface {
  name: string;
  slug: string;
  quantity: number;
  quantity_buy: number;
  image: string;
  price?: number;
  url?: string;
}

export default ItemInterface;

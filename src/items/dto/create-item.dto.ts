interface CreateItemDto {
  name?: string;
  quantity?: number;
  quantity_buy?: number;
  image?: string;
  slug?: string;
  price?: number;
  url?: string;
}

export default CreateItemDto;

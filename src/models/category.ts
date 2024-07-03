import type Product from './product'

export default class Category {
  constructor(
    public uuid: string,
    public title: string,
    public slug: string,
    public created_at: string,
    public updated_at: string,
    public products: Product[] = []
  ) {}

  public static fromJson(data: any): Category {
    return new Category(data.uuid, data.title, data.slug, data.created_at, data.updated_at)
  }
}

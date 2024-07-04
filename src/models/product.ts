import type Brand from './brand'
import type Category from './category'

type ProductMetaData = {
  brand: string
  image: string
}

export default class Product {
  constructor(
    public uuid: string,
    public category_uuid: string,
    public title: string,
    public category: Category,
    public metadata: ProductMetaData,
    public price: number,
    public description?: string,
    public brand?: Brand | null
  ) {}

  public get image(): string {
    return `https://pet-shop.buckhill.com.hr/api/v1/file/${this.metadata.image}`
  }

  public static fromJson(data: any): Product {
    return new Product(
      data.uuid,
      data.category_uuid,
      data.title,
      data.category,
      data.metadata,
      data.price,
      data.description,
      data.brand
    )
  }
}

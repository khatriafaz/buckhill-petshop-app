import http from './shared/http'
import Product from '@/models/product'
import type { BaseListFilters } from './shared/types'

export type ProductListFilters = BaseListFilters & {
  category?: string
  price?: number
  brand?: string
  title?: string
}

class ProductApi {
  public async fetch(uuid: string): Promise<Product> {
    return await http
      .get(`/v1/product/${uuid}`)
      .then((response) => response.data.data)
      .then<Product>((item) => Product.fromJson(item))
  }
  public async list(filters: ProductListFilters = {}): Promise<Array<Product>> {
    return await http
      .get('/v1/products', {
        params: filters
      })
      .then((response) => response.data.data)
      .then<Product[]>((items) => items.map((item: object) => Product.fromJson(item)))
  }
}

export default new ProductApi()

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
